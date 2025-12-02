// backend/routes/reports.js
import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// ✅ Create new report (user side)
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

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Report submission error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✅ Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// ✅ Update report (status/comment/photo/schedule + authority info)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      comment,
      scheduledAt,
      resolvedPic,
      authorityId,
      authorityName,
      authorityEmail,
    } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      {
        status,
        comment,
        scheduledAt,
        resolvedPic,
        authorityId,
        authorityName,
        authorityEmail,
      },
      { new: true }
    );

    res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ message: "Error updating report", error: err });
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
    res.status(500).json({ message: "Error updating rating", error: err });
  }
});

export default router;
