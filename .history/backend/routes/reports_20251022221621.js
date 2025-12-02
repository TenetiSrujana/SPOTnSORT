import express from "express";
import Report from "../models/Report.js";
import User from "../models/user.js";

const router = express.Router();

// ✅ Create new report
router.post("/", async (req, res) => {
  try {
    const { userEmail, problem, subtype, priority, description, area, lat, lng, photo } = req.body;

    if (!userEmail || !problem || !subtype || !description || !area || lat == null || lng == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch user info from users collection
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: Assign a random authority
    const authority = await User.findOne({ role: "authority" });

    const newReport = new Report({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      problem,
      subtype,
      priority,
      description,
      area,
      lat,
      lng,
      photo,
      authority: authority ? {
        id: authority._id,
        name: authority.name,
        email: authority.email,
        phone: authority.phone
      } : null
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Error saving report:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
