const User = require("../models/User");

const UserController = {
  get: (req, res) => {
    User.find()
      .populate("roles")
      .sort({ created_at: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = UserController;
