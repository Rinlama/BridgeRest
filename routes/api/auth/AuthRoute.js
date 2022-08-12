const AuthRoute = require("express").Router();
const AuthController = require("../../../controller/AuthController");
const { body, validationResult } = require("express-validator");
const ThrowValidation = require("../../../utilities/throwValidation");
const RoleMiddleware = require("../../../middleware/RoleMiddleware");

const createLoginValidatorSchema = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

// ****************************************  Login ****************************************
AuthRoute.route("/login").post(
  createLoginValidatorSchema,
  ThrowValidation,
  AuthController.login
);
// ****************************************  Create ****************************************
const createValidatorSchema = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

AuthRoute.route("/register").post(
  createValidatorSchema,
  ThrowValidation,
  AuthController.register
);
// ****************************************  Logout ****************************************
AuthRoute.route("/logout").post(AuthController.logout);

module.exports = AuthRoute;
