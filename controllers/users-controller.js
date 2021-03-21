const { Users } = require("../models");

const userController = {
  //get all users
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //get user by id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //create user
  createUser({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },

  //update user by id
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  //delete user by id
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },

  //add friend to user id by other user id
  addFriend({ params }, res) {
    console.log(params);
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "No user or friend found with one/both ids" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  //remove friend by user id and friend id
  removeFriend({ params }, res) {
    Users.findByIdAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "No user or friend found with these ids" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
