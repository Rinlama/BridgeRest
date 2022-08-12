const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveyModel = new Schema({
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },

  project_name: { type: String },
  your_name: { type: String },
  camera_id: { type: String },
  date_and_time_of_camera_setup_o: { type: String },
  _procedure: { type: String },
  camera_attached_to: { type: String },
  camera_height_cm: { type: String },
  camera_make: { type: String },
  what_feature_is_the_camera_targ: { type: String },
  camera_trap_test: { type: String },
  field_18: { type: String },
  globalid: { type: String },
  objectid: { type: Number },
  attachments: { take_photo_of_the_site: { type: Array, default: [] } },
  geometry: {
    geometryType: { type: String },
    x: { type: Number },
    y: { type: Number },
  },
});

const Survey = mongoose.model("Survey", SurveyModel);

module.exports = Survey;
