// mongooseConnection
const mongooseConnection = require("./db");
mongooseConnection;

const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const roles = [{ name: "User_Role" }, { name: "Admin_Role" }];

Role.collection
  .insertMany(roles)
  .then((data) => {
    Role.findOne({ name: "Admin_Role" }, async (err, role) => {
      const hashedPassword = await bcrypt.hash("admin_password", 10);
      const newUser = new User({
        email: "admin@bridgerest.com",
        password: hashedPassword,
        roles: [role],
      });

      const userData = await newUser.save();
      if (userData) {
        console.log(JSON.stringify(data) + " records inserted!");
        process.exit(0);
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });
