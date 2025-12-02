import express from "express";
import bcrypt from "bcryptjs";
import Authority from "../models/AuthorityReport.js";
import User from "../models/user.js";

const router = express.Router();

// ✅ Register Authority
router.post("/register-authority", async (req, res) => {
  try {
    const { name, email, password, department, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if already exists
    const existing = await Authority.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Authority already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new authority
    const newAuthority = new Authority({
      name,
      email,
      password: hashed,
      department,
      phone,
    });

    await newAuthority.save();

    res.status(201).json({
      message: "Authority registered successfully!",
      authority: newAuthority,
    });
  } catch (error) {
    console.error("❌ Authority register error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
