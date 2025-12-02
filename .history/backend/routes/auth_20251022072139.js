import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Authority from "../models/AuthorityReport.js";

const router = express.Router();

// 🔹 REGISTER new authority
router.post("/register-authority", async (req, res) => {
  try {
    const { name, email, password, phone, department, location } = req.body;

    const existingAuthority = await Authority.findOne({ email });
    if (existingAuthority) {
      return res.status(400).json({ message: "Authority already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAuthority = new Authority({
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      location
    });

    await newAuthority.save();
    res.status(201).json({ message: "Authority registered successfully", authority: newAuthority });
  } catch (error) {
    console.error("Error registering authority:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// 🔹 LOGIN for authority
router.post("/login-authority", async (req, res) => {
  try {
    const { email, password } = req.body;

    const authority = await Authority.findOne({ email });
    if (!authority) return res.status(404).json({ message: "Authority not found" });

    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: authority._id, role: authority.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, authority });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
