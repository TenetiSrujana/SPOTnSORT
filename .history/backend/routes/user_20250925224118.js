const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const reports = require("../models/report");

// Image upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Submit report
router.post("/", upload.single("image"), (req, res) => {
  const { title, category, description, location } = req.body;
  const report = {
    id: reports.length + 1,
    title,
    category,
    description,
    location,
    status: "pending",
    comment: "",
    estimatedDays: "",
    imageUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : ""
  };
  reports.push(report);
  res.json({ success: true, report });
});

module.exports = router;
