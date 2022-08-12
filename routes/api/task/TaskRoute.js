const TaskRoute = require("express").Router();
const { body } = require("express-validator");
const TaskController = require("../../../controller/TaskController");
const ThrowValidation = require("../../../utilities/throwValidation");

// ****************************************  Create ****************************************
const createValidatorSchema = [
  body("created_by"),
  body("updated_by"),
  body("name"),
];

TaskRoute.route("/").post(
  createValidatorSchema,
  ThrowValidation,
  TaskController.create
);

TaskRoute.route("/").get(TaskController.get).delete(TaskController.delete);

TaskRoute.route("/postmany").post(TaskController.createMany);

module.exports = TaskRoute;
