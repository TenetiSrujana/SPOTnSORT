// routes/reports.js
import express from "express";
import Report from "../models/report.js";
const router = express.Router();

// Create a new report
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

// Get all reports (for testing/admin)
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

export default router;
