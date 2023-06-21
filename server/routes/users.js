const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //check existing users
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email already registered. Please login." });
    }

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//sign-in route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if user email exist
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    //check password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // if (user.password !== password) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }
    return res.status(200).json({ message: "login success" });
  } catch (error) {
    console.error("sign in error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
