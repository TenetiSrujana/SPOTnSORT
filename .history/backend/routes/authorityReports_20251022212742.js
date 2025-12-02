// backend/routes/authorityReports.js
import express from "express";
import AuthorityReport from "../models/AuthorityReport.js";

const router = express.Router();

// POST /api/authority/report
router.post("/report", async (req, res) => {
  try {
    const { name, email, department, reportType, description } = req.body;
    if (!name || !email || !department || !reportType || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReport = new AuthorityReport({ name, email, department, reportType, description });
    await newReport.save();
    res.status(201).json({ message: "Authority report submitted", report: newReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Make sure to export as default
export default router;
