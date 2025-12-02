// backend/routes/reports.js
import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// ✅ Create new report
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newReport = new Report(data);
    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Error saving report:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});

// ✅ Update report (status/comment/photo/schedule)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedReport = await Report.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ message: "Error updating report" });
  }
});

// ✅ Add user rating
router.put("/:id/rating", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const report = await Report.findByIdAndUpdate(
      id,
      { userRating: rating },
      { new: true }
    );
    res.status(200).json({ message: "Rating updated", report });
  } catch (err) {
    console.error("Error updating rating:", err);
    res.status(500).json({ message: "Error updating rating" });
  }
});

export default router;
