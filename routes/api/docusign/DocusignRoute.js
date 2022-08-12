const DocusignRoute = require("express").Router();
const ThrowValidation = require("../../../utilities/throwValidation");
const { body, validationResult } = require("express-validator");
const DocuSignController = require("../../../controller/DocusignController");
const DocuSignGetGrantToken = require("../../../config/docusign_jwt_setup");

// ****************************************  Get Credentials ****************************************

DocusignRoute.route("/credentials").get(DocuSignController.getCredential);

const createDocuSignValidatorSchema = [
  body("code").isString().withMessage("Required code"),
];

DocusignRoute.route("/authorization").post(
  createDocuSignValidatorSchema,
  ThrowValidation,
  DocuSignController.getAuthorization
);

DocusignRoute.route("/getGrantToken").get(DocuSignGetGrantToken.Get);

DocusignRoute.route("/verifySigner").get(DocuSignController.verifySigner);

DocusignRoute.route("/verify_token").get(DocuSignGetGrantToken.Verify);

https: module.exports = DocusignRoute;
