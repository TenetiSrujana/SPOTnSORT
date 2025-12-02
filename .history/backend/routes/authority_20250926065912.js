const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// 📌 Schedule work
router.put("/schedule/:id", async (req, res) => {
  try {
    const { scheduleDate, estimatedDays } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { scheduleDate, estimatedDays, status: "In Progress" },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to schedule report" });
  }
});

// 📌 Mark as completed
router.put("/complete/:id", async (req, res) => {
  try {
    const { completionPhoto } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { completionPhoto, status: "Completed", resolvedAt: new Date() },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark report completed" });
  }
});

module.exports = router;
