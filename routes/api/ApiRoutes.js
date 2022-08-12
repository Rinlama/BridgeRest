const router = require("express").Router();
const EsriMiddleware = require("../../middleware/EsriMiddleware");
const PassportMiddleware = require("../../middleware/PassportMiddleware");
const AuthRoute = require("./auth/AuthRoute");
const MediaValetRoute = require("./mediavalet/MediaValetRoute");
const SurveyRoute = require("./survey/SurveyRoute");
const UserRoute = require("./user/UserRoute");
const RoleRoute = require("./role/RoleRoute");
const SurveyWebhookRoute = require("./webhook/SurveyWebhookRoute");
const TaskRoute = require("./task/TaskRoute");
const TaskParamsRoute = require("./taskparams/TaskParamsRoute");
const TaskStatusRoute = require("./taskstatus/TaskStatusRoute");
const DocusignRoute = require("./docusign/DocusignRoute");

// Survey Webhook
router.use("/survey-webhook", EsriMiddleware, SurveyWebhookRoute);

// Media Valet
router.use("/media-valet", PassportMiddleware, MediaValetRoute);

// Media Valet
router.use("/docusign", DocusignRoute);

// Survey
router.use("/survey", PassportMiddleware, SurveyRoute);

// Auth
router.use("/auth", AuthRoute);

// User Management
router.use("/user", PassportMiddleware, UserRoute);
router.use("/role", PassportMiddleware, RoleRoute);

// Task
router.use("/task", TaskRoute);

// Task
router.use("/taskparams", TaskParamsRoute);

// Task Status
router.use("/taskstatus", TaskStatusRoute);

module.exports = router;
