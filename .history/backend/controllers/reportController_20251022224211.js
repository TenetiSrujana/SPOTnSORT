import Report from "../models/Report.js";

// POST /api/reports - create report
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
      !description ||
      !area ||
      lat == null ||
      lng == null
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

// GET /api/reports - get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error("Fetch reports error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/reports/:id - update report (authority)
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    updateData.updatedAt = new Date();

    const updatedReport = await Report.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ message: "Error updating report" });
  }
};

// PUT /api/reports/:id/rating - add user rating
export const addRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const report = await Report.findByIdAndUpdate(
      id,
      { userRating: rating, updatedAt: new Date() },
      { new: true }
    );

    res.status(200).json({ message: "Rating updated", report });
  } catch (err) {
    console.error("Error updating rating:", err);
    res.status(500).json({ message: "Error updating rating" });
  }
};
