const SurveyRoute = require("express").Router();
const { body } = require("express-validator");
const SurveyController = require("../../../controller/SurveyController");
const ThrowValidation = require("../../../utilities/throwValidation");

// ****************************************  Get Credentials ****************************************

SurveyRoute.route("/").get(SurveyController.get);

module.exports = SurveyRoute;
