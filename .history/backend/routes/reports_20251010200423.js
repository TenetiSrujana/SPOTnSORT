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

// ✅ Update report status + photo (for authority updates)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updated = await Report.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Report updated successfully", report: updated });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ message: "Error updating report" });
  }
});

export default router;
