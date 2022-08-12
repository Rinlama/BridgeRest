const router = require("express").Router();
const apiRoutes = require("./api/apiRoutes");
const path = require("path");

// api route
router.use("/api/v1/", apiRoutes);

// // If no API routes are hit, send the React app
// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });
module.exports = router;
