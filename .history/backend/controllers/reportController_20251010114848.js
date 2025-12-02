// backend/controllers/reportController.js
import Report from "../models/Report.js";

// POST /api/reports
export const createReport = async (req, res) => {
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
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/reports (optional: get all reports)
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
