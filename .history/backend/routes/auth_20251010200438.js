import express from "express";

const router = express.Router();

// ✅ Dummy login route (you can expand later)
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "spotnsort@admin" && password === "spotnsort") {
    res.status(200).json({ message: "Login successful", role: "admin" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
