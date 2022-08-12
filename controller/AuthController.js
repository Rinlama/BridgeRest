const config = process.env;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Passport = require("passport");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Role = require("../models/Role");

const AuthController = {
  register: async (req, res) => {
    try {
      const result = await User.findOne({ email: req.body.email })
        .select("email")
        .lean();
      if (result) {
        throw new Error("User already exists");
      }
      const rolData = await Role.findOne({ name: "User_Role" });
      // create hashed Password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hashedPassword,
        roles: [rolData],
      });
      const userData = await newUser.save();
      if (userData) {
        res.status(201).send({
          message: userData,
          isSuccess: true,
        });
      }
    } catch (error) {
      res.status(409).send({
        message: error.message,
        isSuccess: false,
      });
    }
    return;
  },
  // register
  login: (req, res, next) => {
    Passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user)
        res.status(403).send({
          message: "User not found",
          isSuccess: false,
        });
      else {
        req.logIn(user, (err) => {
          if (err) throw err;

          const payload = {
            email: user.email,
          };
          // eslint-disable-next-line consistent-return
          jwt.sign(
            payload,
            config.JWT_KEY,
            { expiresIn: "10h" },
            (errr, token) => {
              res.status(200).send({
                data: {
                  email: user.email,
                  id: user.id,
                  token,
                  roles: user.roles,
                },
                message: "Successfully Authenticated",
                isSuccess: true,
              });
              if (errr) {
                return res.status(400).json({
                  message: {
                    code: `USR_10`,
                    message: `Error occurred`, // eslint-disable-line
                    field: `jwt signing`,
                    status: 400,
                  },
                  isSuccess: false,
                });
              }
            }
          );
        });
      }
    })(req, res, next);
  }, //logout
  logout: (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send({
        data: "",
        message: "Logout Successful",
        isSuccess: true,
      });
    });
  },
};

module.exports = AuthController;
