// backend/routes/reports.js
import express from "express";
import Report from "../models/Report.js"; // Mongoose model

const router = express.Router();

// POST /api/reports
router.post("/", async (req, res) => {
  try {
    const {
      userEmail,
      name,
      phone,
      problem,
      subtype,
      priority,
      description,
      area,
      lat,
      lng,
      photo,
    } = req.body;

    // Validate required fields
    if (
      !userEmail ||
      !problem ||
      !subtype ||
      !priority ||
      !description ||
      !area ||
      lat === null || lat === undefined ||
      lng === null || lng === undefined ||
      !photo || photo.trim() === ""
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new report document
    const newReport = new Report({
      userEmail,
      name,
      phone,
      problem,
      subtype,
      priority,
      description,
      area,
      lat,
      lng,
      photo,
      status: "Pending",
      createdAt: new Date(),
    });

    // Save to MongoDB
    await newReport.save();

    return res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Report submission error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
