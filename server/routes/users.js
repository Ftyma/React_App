const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwtToken");

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

    return res.status(200).json({
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      password: user?.password,
      token: generateToken(user?._id),
      message: "Login success",
    });
  } catch (error) {
    console.error("sign in error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

///get all user
router.get("/getAll", async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//delete a user
router.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByIdAndDelete(id);
    return res.status(200).json({ message: "user delete success" });
  } catch (error) {
    console.error("sign in error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
