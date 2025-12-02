import Report from "../../models/report.js";

// Schedule work (mark In Progress)
export const scheduleReport = async (req, res) => {
  try {
    const { scheduleDate, estimatedDays } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { scheduleDate, estimatedDays, status: "In Progress" },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to schedule report" });
  }
};

// Mark report as completed
export const completeReport = async (req, res) => {
  try {
    const { completionPhoto } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { completionPhoto, status: "Completed", resolvedAt: new Date() },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to mark report completed" });
  }
};
