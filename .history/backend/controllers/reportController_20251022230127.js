import Report from "../models/Report.js";

// Create new report
export const createReport = async (req, res) => {
  try {
    const { userEmail, name, phone, problem, subtype, priority, description, area, lat, lng, photo } = req.body;

    if (!userEmail || !problem || !subtype || !priority || !description || !area || lat == null || lng == null || !photo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReport = new Report({ userEmail, name, phone, problem, subtype, priority, description, area, lat, lng, photo, status: "Pending", createdAt: new Date() });
    await newReport.save();

    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Report submission error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Authority updates report
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorityName, authorityEmail, comment, scheduledAt, estimatedDays, resolvedPic, status } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { authorityName, authorityEmail, comment, scheduledAt, estimatedDays, resolvedPic, status, updatedAt: new Date() },
      { new: true }
    );

    res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get reports for a specific authority
export const getReportsByAuthority = async (req, res) => {
  try {
    const { email } = req.params;
    const reports = await Report.find({ authorityEmail: email }).sort({ updatedAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Error fetching authority reports:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReportRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (rating === undefined || rating < 0) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const report = await Report.findByIdAndUpdate(
      id,
      { userRating: rating },
      { new: true }
    );

    res.status(200).json({ message: "Rating updated", report });
  } catch (err) {
    console.error("Error updating rating:", err);
    res.status(500).json({ message: "Error updating rating" });
  }
};
