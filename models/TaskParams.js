const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskParamsSchema = new Schema({
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },

  created_by: { type: String, required: true },
  updated_by: { type: String, required: true },
  name: { type: String, required: true },
  distribution: { type: String, required: true },

  Task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
});

const TaskParams = mongoose.model("TaskParams", TaskParamsSchema);

module.exports = TaskParams;
