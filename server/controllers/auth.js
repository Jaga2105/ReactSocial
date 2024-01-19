const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Please provide userusername, email and password!",
    });
  }

  const user = await User.findOne({ email });

  if (user)
    return res.status(403).json({
      error: "User already exists",
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const { password, ...others } = newUser._doc;

    return res.status(200).json("User registered successfully!");
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password:clientPassword } = req.body;

  if (!email || !clientPassword) {
    return res.status(404).json({
      error: "Please provide email and password!",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User does n't exist! ",
      });
    }

    const isPasswordValid = await bcrypt.compare(clientPassword, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        error: "Invalid credentials!",
      });
    }

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, { expiresIn: "5d"})

    const {password, ...others} = user._doc
    return res.status(200).json({
      user:{
        _id: others._id,
        username: others.username,
        email: others.email,
        token
      }
    })
  } catch (error) {
    return res.status(500).json({
      error:error.message
    })
  }
};

exports.isSignedIn = async (req, res, next) =>{
  const authHeader = req.headers.authorization;

  if(authHeader){
    const token = authHeader.split(" ")[1];
    if(!token){
      return res.status(400).json({
        error: "No token found!"
      })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      if(err){
        return res.status(403).json({
          error: "Token not valid!"
        })
      }
      req.user= user;
      next();
    })
  }else{
    return res.status(401).json({
      error: "Unauthorized! No token found"
    })
  }
}
