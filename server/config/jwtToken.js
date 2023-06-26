const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecret";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "2d" });
};

module.exports = { generateToken };
