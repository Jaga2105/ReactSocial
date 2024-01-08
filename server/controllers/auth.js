const User = require("../models/User");
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(email)

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Please provide userusername, email and password!",
    });
  }

  const user = await User.findOne({ email });

  if (user)
    return res.status(403).json({
      error: 'User already exists',
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
    
        return res.status(200).json('User registered successfully!');
      } catch (error) {
        return res.status(500).json({
          error: error.message,
        });
      }
};
