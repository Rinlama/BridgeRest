const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
