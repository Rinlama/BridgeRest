const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskStatusSchema = new Schema({
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },

  created_by: { type: String, required: true },
  updated_by: { type: String, required: true },

  survey: { type: Schema.Types.ObjectId, ref: "Survey", required: true },
  task: { type: Schema.Types.ObjectId, ref: "Task", required: true },

  history: [
    {
      taskParams: {
        type: Schema.Types.ObjectId,
        ref: "TaskParams",
        required: true,
      },
      status: { type: String, required: true },
      assets: { type: Array },
    },
  ],
  current_position: {
    taskParams: {
      type: Schema.Types.ObjectId,
      ref: "TaskParams",
      required: true,
    },
    status: { type: String, required: true },
    assets: { type: Array },
  },
});

const TaskStatus = mongoose.model("TaskStatus", TaskStatusSchema);

module.exports = TaskStatus;
