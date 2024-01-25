const { isSignedIn } = require("../controllers/auth");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getOwnPosts,
  getPostById,
  getTimelinePosts,
  createComment,
} = require("../controllers/post");
const { getUserById } = require("../controllers/user");

const router = require("express").Router();

router.param("userId", getUserById);
router.param("postId", getPostById);

// get a user's posts
router.get("/myposts/:userId", getOwnPosts);

// get timeline posts
router.get("/feed/:userId", getTimelinePosts);

// Create Post
router.post("/:userId", createPost);

// Update post
router.put("/:postId/:userId", isSignedIn, updatePost);

// Delete post
router.delete("/:postId/:userId", isSignedIn, deletePost);

// like/dislike a post
router.put("/:postId/like/:userId", isSignedIn, likePost);

// comment on a post
router.put("/:postId/comment/:userId", isSignedIn, createComment);

module.exports = router;
