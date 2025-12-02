// routes/user.js
import express from "express";
import Report from "../models/report.js";  // assuming you have a Report model
const router = express.Router();

// Fetch all reports by logged-in user
router.get("/reports", async (req, res) => {
  try {
    const userId = req.user.id; // if using auth middleware
    const reports = await Report.find({ user: userId });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user reports" });
  }
});

export default router;
