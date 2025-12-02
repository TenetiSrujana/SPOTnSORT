import Report from "../models/reports.js";

// Create a new report (by user)
export const createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
};

// Get all reports (for user or admin)
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

// Get reports for a specific user
export const getUserReports = async (req, res) => {
  try {
    const { email } = req.params; // frontend can send user email
    const reports = await Report.find({ userEmail: email });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user reports" });
  }
};
