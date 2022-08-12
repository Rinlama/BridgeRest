const config = process.env;

const EsriMiddleware = async (req, res, next) => {
  if (!req.query.token) {
    return res.status(401).json({ message: "Missing Authorization Token" });
  }
  if (req.query.token !== config.ESRI_BASIC_AUTH_BASE64) {
    res.status(401).send({
      message: "Unable to verify",
    });
    return;
  }
  next();
};

module.exports = EsriMiddleware;
