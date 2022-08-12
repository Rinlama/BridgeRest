const RoleMiddleware = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = RoleMiddleware;
