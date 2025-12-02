import express from "express";
import Report from "../models/report.js";
import multer from "multer";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE report with comment, scheduled date, resolved photo, status
router.put("/:id", upload.single("resolvedPic"), async (req, res) => {
  try {
    const { comment, scheduledAt, status } = req.body;
    const updateData = { comment, scheduledAt, status };

    // If resolved photo is uploaded
    if (req.file) {
      updateData.resolvedPic = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
    }

    const updatedReport = await Report.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updatedReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update report" });
  }
});

export default router;
