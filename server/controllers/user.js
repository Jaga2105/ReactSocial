const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
      .populate("following", "_id username profilePic")
      .populate("followers", "_id username profilePic");

    if (!user) {
      res.status(404).json({
        error: "User not found!",
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.getUser = async (req, res) => {
  res.json(req.profile);
};

exports.searchUsers = async (req, res) => {
  try {
    const users = req.query.username
      ? await User.find({username: new RegExp(`^${req.query.username}`, 'i'),
        }).select("_id username email profilePic")
      : await User.find().select("_id username email profilePic");
    if (!users) return res.status(404).json("No user found!");
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPeople = async (req, res) => {
  let following = [
    ...req.profile.following,
    {
      _id: req.profile._id,
      username: req.profile.username,
      email: req.profile.email,
    },
  ];
  try {
    // let notFollowed = await User.aggregate([
    //   {
    //     $match: { _id: req.profile._id },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       uniqueValues: {
    //         $setDifference: [req.profile.followers, req.profile.following],
    //       },
    //     },
    //   },
    // ]);
    // if (!notFollowed) return res.status(403).json("No people found!");
    // const result = await Promise.all(
    //   notFollowed[0].uniqueValues.map(async (id) => {
    //     const user = await User.findById(id).select(
    //       "_id username profilePic following followers"
    //     );
    //     return user;
    //   })
    // );

    let users = await User.find({ _id: { $nin: following } }).select(
      "_id username profilePic"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  const userData = req.body;
  try {
    let hashedPassword = "";
    // let updatedProfilePic = "";
    if (userData.password !== "") {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(userData.password, salt);
    }
    // if(profilePic!==""){
    //   updatedProfilePic=password
    // }
    let updatedUser = {};
    for (let key in userData) {
      if (userData[key] !== "") {
        if (key === "password") {
          updatedUser[key] = hashedPassword;
        } else {
          updatedUser[key] = userData[key];
        }
      }
    }
    const result = await User.findByIdAndUpdate(
      req.profile._id,
      {
        $set: updatedUser,
      },
      {
        new: true,
      }
    );
    const { password, ...others } = result._doc;
    return res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addFollowing = async (req, res, next) => {
  try {
    if (!req.profile.following.some((u) => u._id === req.body.followId)) {
      await User.findByIdAndUpdate(req.profile._id, {
        $addToSet: { following: req.body.followId },
      });
      next();
    } else {
      return res.status(500).json({ error: "Already followed" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addFollowers = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.followId,
      {
        $addToSet: { followers: req.profile._id },
      },
      { new: true }
    )
      .populate("following", "_id username")
      .populate("followers", "_id username");

    result.password = undefined;
    result.salt = undefined;
    result.profilePic = undefined;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.profile._id, {
      $pull: { following: req.body.unFollowId },
    });
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.removeFollowers = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.unFollowId,
      {
        $pull: { followers: req.profile._id },
      },
      { new: true }
    )
      .populate("following", "_id username")
      .populate("followers", "_id username");

    result.password = undefined;
    result.salt = undefined;
    result.profilePic = undefined;
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
