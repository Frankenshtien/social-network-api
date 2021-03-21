const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/users-controller");

// /api/users GET, POST
router.route("/").get(getAllUsers).post(createUser);
// /api/users/:id GET, PUT, DELETE
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
// /api/users/:userID/friends/friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
