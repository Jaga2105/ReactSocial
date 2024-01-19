const User = require("../models/User");

exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
      .populate("following", "_id, username, profilePic")
      .populate("following", "_id, username, profilePic");

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

exports.getAllUsers = async (req, res) => {
  try {
    const users = req.query.username
      ? await User.find({
          username: new RegExp(req.query.username, "i"),
        }).select("_id username email profilePic")
      : await User.find().select("_id username email profilePic");
    if (!users) return res.status(404).json("No user found!");
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPeople = async (req, res) => {
  try {
    let notFollowed = await User.aggregate([
      {
        $match: { _id: req.profile._id },
      },
      {
        $project: {
          _id: 0,
          uniqueValues: {
            $setDifference: [req.profile.followers, req.profile.following],
          },
        },
      },
    ]);
    if (!notFollowed) return res.status(403).json("No people found!");
    const result = await Promise.all(
      notFollowed[0].uniqueValues.map(async (id) => {
        const user = await User.findById(id).select(
          "_id username profilePic following followers"
        );
        return user;
      })
    );
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.profile._id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
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
      $pull: { following: req.body.unfollowId },
    });
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.removeFollowers = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.unfollowId,
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