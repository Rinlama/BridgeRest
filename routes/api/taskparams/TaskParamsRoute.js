const TaskParamsRoute = require("express").Router();
const { body } = require("express-validator");
const TaskParamsController = require("../../../controller/TaskParamsController");
const ThrowValidation = require("../../../utilities/throwValidation");

// ****************************************  Get Credentials ****************************************

const createValidatorSchema = [
  body("created_by"),
  body("updated_by"),
  body("name"),
  body("distribution"),
];

TaskParamsRoute.route("/postmany").post(
  createValidatorSchema,
  ThrowValidation,
  TaskParamsController.createMany
);

TaskParamsRoute.route("/")
  .get(TaskParamsController.get)
  .delete(TaskParamsController.delete);

module.exports = TaskParamsRoute;
