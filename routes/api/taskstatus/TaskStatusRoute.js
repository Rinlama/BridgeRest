const TaskStatusRoute = require("express").Router();
const { body } = require("express-validator");
const TaskStatusController = require("../../../controller/TaskStatusController");
const ThrowValidation = require("../../../utilities/throwValidation");

TaskStatusRoute.route("/")
  .get(TaskStatusController.get)
  .post(TaskStatusController.create)
  .put(TaskStatusController.update)
  .delete(TaskStatusController.delete);

module.exports = TaskStatusRoute;
