const qs = require("qs");
const axios = require("axios").default;

let env = process.env;

const MediaValetController = {
  getCredential: (req, res) => {
    res.status(201).send({
      data: {
        client_id: env.MediaValet_CLIENT_ID,
        client_secret: env.MediaValet_CLIENT_SECRET,
        client_redirect_uri: env.MediaValet_REDIRECT_URI,
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
        redirect_uri: env.MediaValet_REDIRECT_URI,
        client_id: env.MediaValet_CLIENT_ID,
        client_secret: env.MediaValet_CLIENT_SECRET,
      });
      const option = {
        method: "POST",
        url: "https://login.mediavalet.com/connect/token",
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
  refreshAuthorization: async (req, res) => {
    const refresh_token = req.body.refresh_token;
    try {
      const encodedBody = qs.stringify({
        grant_type: "refresh_token",
        refresh_token,
        client_id: env.MediaValet_CLIENT_ID,
        client_secret: env.MediaValet_CLIENT_SECRET,
      });
      const option = {
        method: "POST",
        url: "https://login.mediavalet.com/connect/token",
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

module.exports = MediaValetController;
