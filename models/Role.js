const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RoleSchema = Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
