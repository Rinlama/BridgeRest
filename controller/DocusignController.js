const qs = require("qs");
const axios = require("axios").default;

let env = process.env;

const DocuSignController = {
  verifySigner: async (req, res) => {
    const url = `${env.DocuSign_Base_Url}/restapi/${env.DocuSign_Api_Version}/accounts/${env.DocuSign_Account_ID}/envelopes/${req.query.envelopeId}/form_data`;

    const option = {
      method: "GET",
      url: url,
      headers: {
        Authorization: "Bearer " + req.query.token,
      },
    };
    try {
      const { data } = await axios(option);
      res.status(200).send({
        data,
        message: "",
        isSuccess: true,
      });
    } catch (error) {
      res.status(403).send({
        data: [],
        message: error.message,
        isSuccess: true,
      });
    }
  },

  getCredential: (req, res) => {
    res.status(200).send({
      data: {
        client_id: env.Docusign_CLIENT_ID,
        client_secret: env.Docusign_CLIENT_SECRET,
        client_redirect_uri: env.Docusign_REDIRECT_URI,
      },
      message: "",
      isSuccess: true,
    });
  },
  getAuthorization: async (req, res) => {
    const code = req.body.code;
    try {
      const encodedBody = qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: env.Docusign_REDIRECT_URI,
        client_id: env.Docusign_CLIENT_ID,
        client_secret: env.Docusign_CLIENT_SECRET,
      });
      const option = {
        method: "POST",
        url: "https://account-d.docusign.com/oauth/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: encodedBody,
      };

      const { data } = await axios(option);
      res.status(200).send({
        data,
        message: "",
        isSuccess: true,
      });
    } catch (error) {
      res.status(403).send({
        data: error.response.data,
        message: error,
        isSuccess: false,
      });
    }
  },
};

module.exports = DocuSignController;
