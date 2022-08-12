const MediaValetRoute = require("express").Router();
const AuthController = require("../../../controller/AuthController");
const { body, validationResult } = require("express-validator");
const ThrowValidation = require("../../../utilities/throwValidation");
const MediaValetController = require("../../../controller/MediaValetController");

// ****************************************  Get Credentials ****************************************

MediaValetRoute.route("/credentials").get(MediaValetController.getCredential);

// ****************************************  Get Credentials ****************************************

const createMediaValetValidatorSchema = [
  body("code").isString().withMessage("Required code"),
];

MediaValetRoute.route("/authorization").post(
  createMediaValetValidatorSchema,
  ThrowValidation,
  MediaValetController.getAuthorization
);
const refreshMediaValetValidatorSchema = [
  body("refresh_token").isString().withMessage("Required code"),
];

MediaValetRoute.route("/refresh").post(
  refreshMediaValetValidatorSchema,
  ThrowValidation,
  MediaValetController.getAuthorization
);

module.exports = MediaValetRoute;
