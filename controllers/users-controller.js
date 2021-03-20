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
};
