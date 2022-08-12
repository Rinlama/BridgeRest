const RoleRoute = require("express").Router();
const { body } = require("express-validator");
const RoleController = require("../../../controller/RoleController");
const UserController = require("../../../controller/UserController");
const ThrowValidation = require("../../../utilities/throwValidation");

// ****************************************  Get Credentials ****************************************

// RoleRoute.route("/").get(RoleController.get);

module.exports = RoleRoute;
