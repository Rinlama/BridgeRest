const docusign = require("docusign-esign");

const fs = require("fs");

const prompt = require("prompt-sync")();

const jwtConfig = require("./jwtConfig.json");

const DocuSignController = require("../controller/DocusignController");

const SCOPES = ["signature", "impersonation"];

async function authenticate() {
  const jwtLifeSec = 10 * 60, // requested lifetime for the JWT is 10 min
    dsApi = new docusign.ApiClient();
  dsApi.setOAuthBasePath(jwtConfig.dsOauthServer.replace("https://", "")); // it should be domain only.
  let rsaKey = fs.readFileSync(jwtConfig.privateKeyLocation);

  try {
    const results = await dsApi.requestJWTUserToken(
      jwtConfig.dsJWTClientId,
      jwtConfig.impersonatedUserGuid,
      SCOPES,
      rsaKey,
      jwtLifeSec
    );
    const accessToken = results.body.access_token;
    // get user info
    const userInfoResults = await dsApi.getUserInfo(accessToken);

    // use the default account
    let userInfo = userInfoResults.accounts.find(
      (account) => account.isDefault === "true"
    );

    return {
      accessToken: results.body.access_token,
      apiAccountId: userInfo.accountId,
      basePath: `${userInfo.baseUri}/restapi`,
    };
  } catch (e) {
    let body = e.response && e.response.body;
    return new Error(body);
  }
}

const DocuSignGetGrantToken = {
  Get: async (req, res) => {
    try {
      let accountInfo = await authenticate();
      req.query.token = accountInfo.accessToken;
      return DocuSignController.verifySigner(req, res);
    } catch (error) {
      res.status(422).json("Please consent Docsign on Gateway.");
    }
  },
  Verify: async (req, res) => {
    try {
      let accountInfo = await authenticate();
      res.status(200).json(accountInfo);
    } catch (error) {
      res.status(422).json("Please consent Docsign on Gateway.");
    }
  },
};

module.exports = DocuSignGetGrantToken;
