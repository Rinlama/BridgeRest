const UserRoute = require("express").Router();
const { body } = require("express-validator");
const UserController = require("../../../controller/UserController");
const ThrowValidation = require("../../../utilities/throwValidation");

// ****************************************  Get Credentials ****************************************

UserRoute.route("/").get(UserController.get);

module.exports = UserRoute;
