const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Signup - Create User
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    const successful_message = {
      successful_message:
        "Account created successfully! and Please login using your username & password",
    };
    res.status(201).json(successful_message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login - Generate JWT
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT
    const payload = { userId: user._id };
    const your_secret_key = "your_secret_key";
    const token = jwt.sign(payload, your_secret_key, {
      expiresIn: "1h",
    });

    res.status(200).json({ jwt_token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
