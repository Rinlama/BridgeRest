require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();
const router = require("./routes/Route");
const cors = require("cors");
const mongooseConnection = require("./db/db");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const expressSwagger = require("express-swagger-generator")(app);
const options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/v1",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: __dirname, // app absolute path
  files: ["./routes/**/*.js"], // Path to the API handle folder
};
expressSwagger(options);

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));

//----------------------------------------- ROUTE---------------------------------------------------
app.use(cors({ origin: true, credentials: true }));

//----------------------------------------- START MIDDLEWARE---------------------------------------------------
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

require("./config/PassportConfig")(passport);

const PassportMiddleware = require("./middleware/PassportMiddleware");
app.get(
  "/user",
  PassportMiddleware,
  passport.authenticate("jwt"),
  (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  }
);
//----------------------------------------- END MIDDLEWARE---------------------------------------------------

// router
app.use(router);

// mongooseConnection
mongooseConnection;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
