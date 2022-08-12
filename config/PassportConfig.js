const config = process.env;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const bcrypt = require("bcryptjs");
const User = require("../models/User");

const PassportConfig = function (passport) {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        User.findOne({ email: email })
          .populate("roles")
          .exec((err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);

            bcrypt.compare(password, user.password, (err, result) => {
              if (err) throw err;
              if (result === true) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          });
      }
    )
  );

  // const jwtOptions = {
  //   secretOrKey: config.JWT_KEY,
  //   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  // };
  // // This verifies that the token sent by the user is valid
  // passport.use(
  //   new JwtStrategy(
  //     jwtOptions,
  //     // eslint-disable-next-line consistent-return
  //     async (token, done) => {
  //       try {
  //         // Find the user associated with the email provided by the user
  //         const user = await User.findOne({
  //           where: {
  //             // eslint-disable-next-line object-shorthand
  //             email: token.email,
  //           },
  //         });
  //         if (!user) {
  //           // If the user isn't found in the database, return a message
  //           return done(null, false, { message: "User not found" });
  //         }

  //         // Send the user information to the next middleware
  //         return done(null, user, { message: "Logged in Successfully" });
  //       } catch (error) {
  //         done(error);
  //       }
  //     }
  //   )
  // );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({ _id: id })
      .populate("roles")
      .exec((err, user) => {
        const userInformation = {
          email: user.email,
          roles: user.roles,
        };
        done(err, userInformation);
      });
  });
};

module.exports = PassportConfig;
