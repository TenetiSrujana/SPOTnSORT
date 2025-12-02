import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Authority from "../models/AuthorityReport.js";

const router = express.Router();

// ✅ Register Normal User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed, phone, role: "user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Register user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Register Authority (Admin/Department officer)
router.post("/register-authority", async (req, res) => {
  try {
    const { name, email, password, phone, department } = req.body;

    const existing = await Authority.findOne({ email });
    if (existing) return res.status(400).json({ message: "Authority already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newAuthority = new Authority({
      name,
      email,
      password: hashed,
      phone,
      department,
    });

    await newAuthority.save();

    res.status(201).json({ message: "Authority registered successfully!", authority: newAuthority });
  } catch (error) {
    console.error("Authority register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login (works for both user & authority)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Try finding in Users first
    let user = await User.findOne({ email });
    let roleType = "user";

    // If not found, check Authority collection
    if (!user) {
      user = await Authority.findOne({ email });
      roleType = "authority";
    }

    if (!user) return res.status(404).json({ message: "Account not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: roleType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
