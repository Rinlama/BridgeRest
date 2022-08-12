const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },

  created_by: { type: String, required: true },
  updated_by: { type: String, required: true },
  name: { type: String, required: true },
  survey: { type: Schema.Types.ObjectId, ref: "TaskParams", required: true },

  task_params: [
    { type: Schema.Types.ObjectId, ref: "TaskParams", required: true },
  ],
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
