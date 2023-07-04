const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET =
  "019a0414c9e65f26d213fdb32abb79d99523c4ce40c82d82c16286f51655cf26c81703084b9f8d6c4cb95aa185a6bed4bf44803a705c745bd06497f7c61e8ce4";

const authMiddleware = async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
        console.log(decoded);
      }
    } catch (error) {
      res.status(401).json("Not authorized token.");
    }
  } else {
    res.status(401).json({ error: "There is no token attached to header" });
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("User are not allowed to access this");
  } else {
    next();
  }
};

module.exports = { authMiddleware, isAdmin };
