require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();
const router = require("./routes/Route");
const cors = require("cors");
const mongooseConnection = require("./db/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
app.use(cors({ origin: true, credentials: true }));
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
