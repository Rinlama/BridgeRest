const SurveyController = require("../../../controller/SurveyController");

const SurveyWebhookRoute = require("express").Router();

SurveyWebhookRoute.route("/receive").post(SurveyController.create);

module.exports = SurveyWebhookRoute;
