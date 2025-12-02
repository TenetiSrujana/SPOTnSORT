// src/pages/Authority/ManageReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageReport() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterProblem, setFilterProblem] = useState("");
  const [filterArea, setFilterArea] = useState("");

  const [commentInputs, setCommentInputs] = useState({});
  const [scheduleInputs, setScheduleInputs] = useState({});
  const [timeInputs, setTimeInputs] = useState({});
  const [uploadedPhotos, setUploadedPhotos] = useState({});

  // Fetch reports
  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/reports");
      const all = res.data || [];

      const active = all.filter(
        (r) => r.status === "Pending" || r.status === "In Progress"
      );

      setReports(active);
      setFilteredReports(active);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Apply filters
  useEffect(() => {
    let temp = [...reports];

    if (filterProblem) {
      temp = temp.filter((r) =>
        (r.problem || "").toLowerCase().includes(filterProblem.toLowerCase()) ||
        (r.subtype || "").toLowerCase().includes(filterProblem.toLowerCase())
      );
    }

    if (filterArea) {
      temp = temp.filter((r) =>
        (r.area || "").toLowerCase().includes(filterArea.toLowerCase())
      );
    }

    setFilteredReports(temp);
  }, [filterProblem, filterArea, reports]);

  // Update report in backend
  const updateReport = async (id, data) => {
    try {
      await axios.put(`http://localhost:5001/api/reports/${id}`, data);
      fetchReports();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Submit (resolve)
  const resolveReport = async (r) => {
    if (!uploadedPhotos[r._id]) return alert("Upload a photo first!");

    const combinedTime =
      (scheduleInputs[r._id] || "") + " " + (timeInputs[r._id] || "00:00");

    await updateReport(r._id, {
      status: "Resolved",
      comment: commentInputs[r._id] || "",
      scheduledAt: combinedTime,
      resolvedPic: uploadedPhotos[r._id],
    });

    alert("✔ Report resolved!");
  };

  // Upload photo
  const handlePhotoUpload = (e, id) => {
    let file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedPhotos((prev) => ({ ...prev, [id]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Reusable button classes
  const yellowBtn =
    "px-4 py-2 bg-yellow-400 text-black rounded-lg border border-yellow-500 hover:bg-white hover:text-yellow-500 transition";

  const outlineBtn =
    "px-4 py-2 bg-transparent text-yellow-400 border border-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition";

  return (
    <div className="min-h-screen text-white bg-[url('/assets/home-bg.jpg')] bg-cover bg-center pt-24 px-4">

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex items-center justify-between bg-black bg-opacity-40 backdrop-blur-md px-8 py-4 shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/authority/home")}
              className={yellowBtn}
            >
              ←
            </button>
            <h1 className="text-3xl font-extrabold text-yellow-400">
              Manage Reports
            </h1>
          </div>
        </nav>
      </header>

      {/* FILTER BAR */}
      <div className="max-w-6xl mx-auto mt-10 bg-black bg-opacity-40 backdrop-blur-md p-4 rounded-xl border border-yellow-500 shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-yellow-400">
          Filters
        </h2>

        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Filter by problem..."
            value={filterProblem}
            onChange={(e) => setFilterProblem(e.target.value)}
            className="p-2 rounded-md bg-black bg-opacity-60 border border-yellow-500 text-white"
          />

          <input
            type="text"
            placeholder="Filter by area..."
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="p-2 rounded-md bg-black bg-opacity-60 border border-yellow-500 text-white"
          />

          <button
            onClick={() => {
              setFilterArea("");
              setFilterProblem("");
            }}
            className={outlineBtn}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* REPORT LIST */}
      <div className="max-w-6xl mx-auto mt-8 space-y-8">

        {filteredReports.length === 0 ? (
          <p className="text-center text-gray-300">No reports found.</p>
        ) : (
          filteredReports.map((r) => (
            <div
              key={r._id}
              className="bg-black bg-opacity-40 backdrop-blur-md border border-yellow-500 rounded-xl p-6 shadow-lg"
            >
              {/* TITLE + STATUS */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-yellow-300">
                  {r.problem}
                </h2>

                <span className="px-3 py-1 text-sm bg-yellow-500 text-black rounded-full">
                  {r.status}
                </span>
              </div>

              <p className="text-gray-300 mb-2">
                <b>Subtype:</b> {r.subtype}
              </p>

              <p className="text-gray-300 mb-2">
                <b>Area:</b> {r.area}
              </p>

              <p className="text-gray-300 mb-4">{r.description}</p>

              {/* PHOTO */}
              {r.photo && (
                <img
                  src={r.photo}
                  alt="Report"
                  className="rounded-lg max-w-xs border border-yellow-500 mb-4"
                />
              )}

              {/* ACTION SECTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Comments */}
                <div>
                  <label className="text-sm text-yellow-400">Add Comment</label>
                  <input
                    type="text"
                    className="w-full p-2 mt-1 bg-black bg-opacity-60 border border-yellow-500 rounded-md"
                    value={commentInputs[r._id] || ""}
                    onChange={(e) =>
                      setCommentInputs({
                        ...commentInputs,
                        [r._id]: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Date & Time */}
                <div>
                  <label className="text-sm text-yellow-400">Schedule</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="date"
                      className="p-2 bg-black bg-opacity-60 border border-yellow-500 rounded-md"
                      onChange={(e) =>
                        setScheduleInputs({
                          ...scheduleInputs,
                          [r._id]: e.target.value,
                        })
                      }
                    />
                    <input
                      type="time"
                      className="p-2 bg-black bg-opacity-60 border border-yellow-500 rounded-md"
                      onChange={(e) =>
                        setTimeInputs({
                          ...timeInputs,
                          [r._id]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Upload Photo */}
                <div>
                  <label className="text-sm text-yellow-400">Upload Work Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1"
                    onChange={(e) => handlePhotoUpload(e, r._id)}
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={() =>
                    updateReport(r._id, { status: "In Progress" })
                  }
                  className={yellowBtn}
                >
                  Mark In Progress
                </button>

                <button
                  onClick={() => resolveReport(r)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg transition"
                >
                  Resolve Issue
                </button>

                <button
                  onClick={() =>
                    window.open(`https://maps.google.com?q=${r.lat},${r.lng}`)
                  }
                  className={outlineBtn}
                >
                  View on Map
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
