import express from "express";
import Report from "../models/Report.js";
import AuthorityReport from "../models/AuthorityReport.js";

const router = express.Router();

// Create new report
router.post("/", async (req, res) => {
  try {
    const {
      userEmail, name, phone, problem, subtype, priority,
      description, area, lat, lng, photo, authorityEmail
    } = req.body;

    const newReport = new Report({
      userEmail, name, phone, problem, subtype, priority,
      description, area, lat, lng, photo, status: "Pending",
    });

    // Save report
    await newReport.save();

    // If authorityEmail is provided, save in AuthorityReport collection
    if (authorityEmail) {
      let authority = await AuthorityReport.findOne({ authorityEmail });
      if (!authority) {
        authority = new AuthorityReport({ authorityEmail, name: "", assignedReports: [] });
      }
      authority.assignedReports.push(newReport._id);
      await authority.save();

      newReport.authority = authority._id;
      await newReport.save();
    }

    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().populate("authority").sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reports" });
  }
});

export default router;
