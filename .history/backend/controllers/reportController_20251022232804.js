// backend/controllers/reportController.js
import Report from "../models/Report.js";
import User from "../models/User.js"; // assuming authority info is in User collection

// Authority updates a report
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment, scheduledAt, resolvedPic, authorityEmail } = req.body;

    // Fetch authority details
    let authorityInfo = {};
    if (authorityEmail) {
      const authUser = await User.findOne({ email: authorityEmail });
      if (authUser && authUser.role === "authority") {
        authorityInfo = {
          _id: authUser._id,
          name: authUser.name,
          role: authUser.role,
          phone: authUser.phone,
          idCard: authUser.idCard || "", // optional
        };
      }
    }

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      {
        status,
        comment,
        scheduledAt,
        resolvedPic,
        authorityInfo, // store all authority details here
      },
      { new: true }
    );

    res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ message: "Error updating report" });
  }
};
