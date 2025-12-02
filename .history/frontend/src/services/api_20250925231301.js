import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // change if your backend URL is different

// ------------------- Reports APIs -------------------

// Fetch reports assigned to logged-in authority
export const getAssignedReports = async () => {
  try {
    const res = await axios.get(`${API_BASE}/reports/assigned`, {
      withCredentials: true, // if backend uses cookies/session
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching assigned reports:", err);
    throw err;
  }
};

// Update a report (status, schedule, upload photo, etc.)
export const updateReport = async (reportId, updateData) => {
  try {
    const res = await axios.put(`${API_BASE}/reports/${reportId}`, updateData, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Error updating report:", err);
    throw err;
  }
};
