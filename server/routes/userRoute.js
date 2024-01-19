const { isSignedIn } = require("../controllers/auth");
const { getUserById, getUser, updateUser, addFollowing, addFollowers, removeFollowing, removeFollowers, getAllUsers, getPeople } = require("../controllers/user");

const router = require("express").Router();

router.param("userId", getUserById);

// Get user details
router.get('/:userId', isSignedIn, getUser)

// Get users
router.get('/', getAllUsers)

// Find people
router.get('/people/:userId', isSignedIn, getPeople)

// Update user
router.put('/:userId', isSignedIn, updateUser)

// Follow user
router.put('/follow/:userId', isSignedIn, addFollowing,addFollowers )

// Unfollow user
router.put('/unfollow/:userId', isSignedIn, removeFollowing,removeFollowers )

module.exports = router;