import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// 📌 User Registration API
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, address, password, role } = req.body;

    // Validate inputs
    if (!name || !email || !phone || !address || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, phone, address, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "✅ Registration successful!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "❌ Server error during registration" });
  }
});

// 📌 User Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "✅ Login successful!", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "❌ Server error during login" });
  }
});

export default router;
