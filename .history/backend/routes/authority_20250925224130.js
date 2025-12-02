const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const reports = require("../models/report");

// Image upload setup for authority completion
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all reports
router.get("/", (req, res) => {
  res.json(reports);
});

// Complete a report
router.post("/:id/complete", upload.single("completionFile"), (req, res) => {
  const report = reports.find(r => r.id == req.params.id);
  if (!report) return res.status(404).json({ message: "Report not found" });

  const { comment, estimatedDays } = req.body;
  report.status = "completed";
  report.comment = comment || "";
  report.estimatedDays = estimatedDays || "";
  report.completionFile = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : "";

  res.json({ success: true, report });
});

module.exports = router;
