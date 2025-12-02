// src/pages/Authority/ManageReport.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import "../../styles/main.css";

const AuthorityAssignedReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [comment, setComment] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [completionImage, setCompletionImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch assigned reports
  const fetchReports = async () => {
    try {
      const res = await axios.get("/api/authority/reports"); // replace with your backend endpoint
      setReports(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reports.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setComment(report.authorityComment || "");
    setEstimatedDays(report.estimatedDays || "");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setCompletionImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedReport) return;
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("estimatedDays", estimatedDays);
    if (completionImage) formData.append("completionImage", completionImage);

    try {
      await axios.post(`/api/authority/reports/${selectedReport._id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Report updated successfully!");
      setSelectedReport(null);
      setComment("");
      setEstimatedDays("");
      setCompletionImage(null);

      fetchReports(); // refresh the list
    } catch (err) {
      console.error(err);
      setError("Failed to update report.");
    }
  };

  return (
    <div className="relative text-white min-h-screen overflow-y-auto">
      <BubblesBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <h1
            className="text-3xl font-extrabold text-yellow-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/authority/home")}
          >
            SpotnSort Authority
          </h1>
          <ul className="flex space-x-6 font-semibold text-white">
            <li
              className="px-4 py-2 cursor-pointer hover:text-yellow-400 hover:scale-105 transition"
              onClick={() => navigate("/authority/home")}
            >
              Home
            </li>
            <li
              className="px-4 py-2 cursor-pointer text-red-400 hover:text-red-500 hover:scale-105 transition"
              onClick={() => navigate("/")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </header>

      <section className="pt-32 px-6 pb-24 max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-yellow-400 text-center">
          Assigned Reports
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-400 mb-4 text-center">{success}</p>}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Report List */}
          <div className="flex-1 bg-black bg-opacity-50 p-4 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Reports in Your Area</h3>
            {reports.length === 0 && <p>No reports assigned yet.</p>}
            <ul className="space-y-3 max-h-[70vh] overflow-y-auto">
              {reports.map((r) => (
                <li
                  key={r._id}
                  className={`p-3 rounded cursor-pointer border ${
                    selectedReport?._id === r._id
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : r.status === "completed"
                      ? "bg-green-600 border-green-400"
                      : "bg-red-600 border-red-400"
                  }`}
                  onClick={() => handleSelectReport(r)}
                >
                  <p>
                    <strong>Category:</strong> {r.category}
                  </p>
                  <p>
                    <strong>Location:</strong> {r.location}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Report Details */}
          {selectedReport && (
            <div className="flex-1 bg-black bg-opacity-50 p-4 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Report Details</h3>
              <p><strong>User:</strong> {selectedReport.userName}</p>
              <p><strong>Category:</strong> {selectedReport.category}</p>
              <p><strong>Description:</strong> {selectedReport.description}</p>
              <p><strong>Location:</strong> {selectedReport.location}</p>
              <p><strong>Date:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</p>

              <div className="flex flex-col gap-3 mt-4">
                <label className="flex flex-col">
                  Comment / Notes:
                  <textarea
                    className="mt-1 p-2 rounded bg-white text-black"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </label>

                <label className="flex flex-col">
                  Estimated Days to Complete:
                  <input
                    type="number"
                    className="mt-1 p-2 rounded bg-white text-black"
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(e.target.value)}
                  />
                </label>

                <label className="flex flex-col">
                  Upload Completion Image:
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    onChange={handleFileChange}
                  />
                </label>

                <button
                  className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
                  onClick={handleSubmit}
                >
                  Submit Update <FaCheckCircle className="inline ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AuthorityAssignedReports;
