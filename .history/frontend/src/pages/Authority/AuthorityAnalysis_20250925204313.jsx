// src/pages/Authority/ManageReport.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import "../../styles/main.css";

const ManageReport = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updates, setUpdates] = useState({}); // for comments, schedule, days, image

  useEffect(() => {
    // Fetch assigned reports for this authority
    const fetchReports = async () => {
      try {
        const res = await axios.get("/api/authority/reports"); // your backend endpoint
        setReports(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleInputChange = (reportId, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [reportId]: {
        ...prev[reportId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (reportId) => {
    const updateData = updates[reportId];
    if (!updateData) return;

    const formData = new FormData();
    formData.append("comment", updateData.comment || "");
    formData.append("scheduledDate", updateData.scheduledDate || "");
    formData.append("estimatedDays", updateData.estimatedDays || "");
    if (updateData.proofImage) formData.append("proofImage", updateData.proofImage);

    try {
      await axios.post(`/api/authority/reports/${reportId}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update local state to mark as completed and green on map (optional)
      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId ? { ...r, status: "Resolved", proofUploaded: true } : r
        )
      );

      alert("Report updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update report.");
    }
  };

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="relative text-white min-h-screen overflow-y-auto">
      <BubblesBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <h1
            className="text-3xl font-extrabold text-yellow-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

      <section className="pt-32 px-6 pb-24 relative z-10">
        <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">
          Assigned Reports
        </h2>

        {reports.length === 0 ? (
          <p className="text-center text-white">No assigned reports yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {reports.map((report) => {
              const update = updates[report.id] || {};
              return (
                <div
                  key={report.id}
                  className={`bg-black bg-opacity-80 p-6 rounded-xl shadow-lg flex flex-col space-y-3`}
                >
                  <h3 className="text-2xl font-semibold text-yellow-400">
                    {report.category} ({report.status})
                  </h3>
                  <p><strong>Reported By:</strong> {report.userName}</p>
                  <p><strong>Location:</strong> {report.location}</p>
                  <p><strong>Description:</strong> {report.description}</p>
                  {report.image && (
                    <img
                      src={report.image}
                      alt="Reported Issue"
                      className="rounded shadow-md max-h-40 object-cover"
                    />
                  )}

                  <div className="flex flex-col gap-2">
                    <textarea
                      placeholder="Add comment"
                      className="px-3 py-2 rounded bg-white text-black"
                      value={update.comment || ""}
                      onChange={(e) =>
                        handleInputChange(report.id, "comment", e.target.value)
                      }
                    />

                    <input
                      type="date"
                      className="px-3 py-2 rounded bg-white text-black"
                      value={update.scheduledDate || ""}
                      onChange={(e) =>
                        handleInputChange(report.id, "scheduledDate", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="Estimated days to complete"
                      className="px-3 py-2 rounded bg-white text-black"
                      value={update.estimatedDays || ""}
                      onChange={(e) =>
                        handleInputChange(report.id, "estimatedDays", e.target.value)
                      }
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleInputChange(report.id, "proofImage", e.target.files[0])
                      }
                      className="text-white"
                    />
                  </div>

                  <button
                    onClick={() => handleSubmit(report.id)}
                    className="mt-2 px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
                  >
                    Submit Update
                  </button>

                  {report.proofUploaded && (
                    <p className="text-green-400 font-semibold mt-2">
                      Proof uploaded, status updated!
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageReport;
