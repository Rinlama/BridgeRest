const { validationResult } = require("express-validator");

const ThrowValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  next();
};
module.exports = ThrowValidation;
