// backend/routes/reports.js
import express from "express";
import Report from "../models/Report.js";
import AuthorityReport from "../models/AuthorityReport.js"; // ✅ NEW import

const router = express.Router();

// ✅ Create new report + authority log
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // 1️⃣ Save user report
    const newReport = new Report(data);
    await newReport.save();

    // 2️⃣ Automatically assign an authority based on problem type
    let authorityName = "Municipal Officer";
    let authorityEmail = "authority@example.com";
    let department = "General";

    if (data.problem === "Garbage") {
      authorityName = "Sanitation Officer";
      authorityEmail = "sanitation@spotnsort.com";
      department = "Sanitation";
    } else if (data.problem === "Street Lights") {
      authorityName = "Electrical Department Officer";
      authorityEmail = "electrical@spotnsort.com";
      department = "Electrical";
    } else if (data.problem === "Water Leakage") {
      authorityName = "Water Supply Officer";
      authorityEmail = "water@spotnsort.com";
      department = "Water Department";
    }

    // 3️⃣ Create authority report entry
    const newAuthorityReport = new AuthorityReport({
      reportId: newReport._id,
      authorityName,
      authorityEmail,
      department,
      status: "Pending",
    });

    await newAuthorityReport.save();

    res.status(201).json({
      message: "Report and authority record created successfully!",
      report: newReport,
      authority: newAuthorityReport,
    });
  } catch (err) {
    console.error("Error saving report:", err);
    res.status(500).json({ message: "Server error" });
  }
});
