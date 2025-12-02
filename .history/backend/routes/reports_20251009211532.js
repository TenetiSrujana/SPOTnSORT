import express from "express";
import Report from "../models/report.js";

const router = express.Router();

// Create a new report
router.post("/", async (req, res) => {
  try {
    const { userEmail, name, problem, subtype, description, area, priority } = req.body;

    // Make sure all required fields are provided
    if (!userEmail || !name || !problem || !area) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const report = new Report({
      userEmail,
      name,
      problem,
      subtype,
      description,
      area,
      priority,
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
