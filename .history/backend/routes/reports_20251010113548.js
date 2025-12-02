import express from "express";
import Report from "../models/Report.js"; // your Mongoose model

const router = express.Router();

// POST /api/reports
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    // Optional: validate required fields
    const { userEmail, problem, subtype, priority, description, area, lat, lng, photo } = data;
    if (!userEmail || !problem || !subtype || !priority || !description || !area || !lat || !lng || !photo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReport = new Report(data);
    await newReport.save();

    res.status(201).json({ message: "Report submitted", report: newReport });
  } catch (err) {
    console.error("Report submission error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
