import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// Create new report
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Optional: include authority info if provided
    // e.g., data.authority = { name, email, role, etc. }

    const newReport = new Report(data);
    await newReport.save();

    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Error saving report:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
