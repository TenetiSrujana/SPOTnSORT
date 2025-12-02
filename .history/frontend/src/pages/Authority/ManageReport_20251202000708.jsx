// src/pages/Authority/ManageReport.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * ManageReport (Style A)
 * - Fixed filters (works on problem/subtype and area/lat/lng)
 * - Clean/responsive card layout matching other pages
 * - Buttons: yellow default, white on hover with yellow text (consistent)
 * - Non-stretching buttons, neat spacing
 * - Keeps localStorage persistence for inputs + photo handling
 */

export default function ManageReport() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterProblem, setFilterProblem] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [commentInputs, setCommentInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("commentInputs")) || {};
  });
  const [scheduleInputs, setScheduleInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("scheduleInputs")) || {};
  });
  const [timeInputs, setTimeInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("timeInputs")) || {};
  });
  const [estimatedDaysInputs, setEstimatedDaysInputs] = useState(() => {
    return JSON.parse(localStorage.getItem("estimatedDaysInputs")) || {};
  });
  const [stats, setStats] = useState({ total: 0, progress: 0, resolved: 0 });
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/reports");
      const all = res.data || [];

      // active reports for authority to manage = Pending + In Progress
      const active = all.filter((r) => r.status === "Pending" || r.status === "In Progress");
      setReports(active);

      const total = all.length;
      const progress = all.filter((r) => r.status === "In Progress").length;
      const resolved = all.filter((r) => r.status === "Resolved").length;
      setStats({ total, progress, resolved });
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 8000); // refresh periodically
    return () => clearInterval(interval);
  }, []);

  // FILTER LOGIC: reacts to changes in reports, problem filter, area filter
  useEffect(() => {
    let temp = [...reports];

    // Problem filter - check both problem and subtype (case-insensitive)
    if (filterProblem) {
      const p = filterProblem.toLowerCase();
      temp = temp.filter(
        (r) =>
          (r.problem && r.problem.toLowerCase() === p) ||
          (r.subtype && r.subtype.toLowerCase() === p)
      );
    }

    // Area filter - match against area, lat, lng, locality fields (contains)
    if (filterArea) {
      const areaLower = filterArea.toLowerCase().trim();
      temp = temp.filter((r) => {
        const areaFields = [
          r.area || "",
          r.locality || "",
          r.city || "",
          String(r.lat || ""),
          String(r.lng || ""),
        ]
          .map((v) => String(v).toLowerCase())
          .join(" ");
        return areaFields.includes(areaLower);
      });
    }

    setFilteredReports(temp);
  }, [filterProblem, filterArea, reports]);

  const openMap = (r) => {
    if (r.lat && r.lng) {
      window.open(`https://www.google.com/maps?q=${r.lat},${r.lng}`, "_blank");
    } else {
      alert("No coordinates available for this report");
    }
  };

  const updateReport = async (id, data) => {
    try {
      await axios.put(`http://localhost:5001/api/reports/${id}`, data);
      await fetchReports();
      // do NOT stack alerts; single friendly message
      alert("✅ Report updated.");
    } catch (err) {
      console.error("Error updating:", err);
      alert("⚠️ Failed to update report!");
    }
  };

  const handlePhotoUpload = (e, id) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedPhotos((prev) => ({ ...prev, [id]: reader.result }));
      alert("📷 Photo selected successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (r) => {
    if (!uploadedPhotos[r._id]) {
      alert("⚠️ Please upload a photo before submitting!");
      return;
    }

    const scheduledAtCombined =
      (scheduleInputs[r._id] || r.scheduledAt || "") +
      " " +
      (timeInputs[r._id] || "00:00");

    updateReport(r._id, {
      comment: commentInputs[r._id] || r.comment || "",
      scheduledAt: scheduledAtCombined,
      estimatedDays: estimatedDaysInputs[r._id] || r.estimatedDays || "",
      resolvedPic: uploadedPhotos[r._id],
      status: "Resolved",
    });

    // small friendly confirmation
    setTimeout(() => {
      alert("✅ Report marked as Resolved and will appear in User Analysis!");
    }, 300);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFilterArea(`${pos.coords.latitude},${pos.coords.longitude}`);
        },
        () => alert("Failed to get current location")
      );
    } else alert("Geolocation not supported");
  };

  const minDate = new Date().toISOString().split("T")[0];

  // persist inputs
  useEffect(() => {
    localStorage.setItem("commentInputs", JSON.stringify(commentInputs));
  }, [commentInputs]);
  useEffect(() => {
    localStorage.setItem("scheduleInputs", JSON.stringify(scheduleInputs));
  }, [scheduleInputs]);
  useEffect(() => {
    localStorage.setItem("timeInputs", JSON.stringify(timeInputs));
  }, [timeInputs]);
  useEffect(() => {
    localStorage.setItem("estimatedDaysInputs", JSON.stringify(estimatedDaysInputs));
  }, [estimatedDaysInputs]);

  // UI helper classes for consistent buttons (yellow -> white hover)
  const primaryBtn =
    "px-3 py-2 rounded-md font-semibold border border-yellow-400 transition-all duration-150 hover:bg-white hover:text-yellow-400";
  const secondaryBtn = "px-3 py-2 rounded-md transition-all duration-150";

  return (
    <div className="min-h-screen bg-[url('/assets/home-bg.jpg')] bg-cover bg-no-repeat bg-center text-white pt-24 relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/authority/home")}
              className={`${primaryBtn} bg-yellow-400 text-black`}
            >
              ←
            </button>
            <h1
              className="text-2xl md:text-3xl font-extrabold text-yellow-400 cursor-pointer"
              onClick={() => navigate("/authority/home")}
            >
              Manage Civic Reports
            </h1>
          </div>
        </nav>
      </header>

      {/* Page content */}
      <div className="p-6 max-w-6xl mx-auto">
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 mt-6">
          <div className="px-4 py-2 rounded-xl shadow" style={{ background: "#FCA5A5", color: "#000" }}>
            Total Reports: <b>{stats.total}</b>
          </div>
          <div className="px-4 py-2 rounded-xl shadow" style={{ background: "#FDE68A", color: "#000" }}>
            In Progress: <b>{stats.progress}</b>
          </div>
          <div className="px-4 py-2 rounded-xl shadow" style={{ background: "#A7F3D0", color: "#000" }}>
            Resolved: <b>{stats.resolved}</b>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <select
            value={filterProblem}
            onChange={(e) => setFilterProblem(e.target.value)}
            className="p-2 rounded bg-black bg-opacity-60 border border-yellow-400 text-white"
            style={{ minWidth: 220 }}
          >
            <option value="">-- Filter by Problem (all) --</option>
            <option value="Garbage">Garbage</option>
            <option value="Street Lights">Street Lights</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Trees">Trees</option>
            <option value="Potholes">Potholes</option>
            <option value="Traffic Congestion">Traffic Congestion</option>
            <option value="Lack of Public Amenities">Lack of Public Amenities</option>
          </select>

          <input
            type="text"
            placeholder="Filter by area / lat / lng"
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="p-2 rounded bg-black bg-opacity-60 text-white border border-yellow-400"
            style={{ minWidth: 260 }}
          />

          <button onClick={getCurrentLocation} className={`${secondaryBtn} bg-indigo-500 hover:bg-indigo-600 text-white`}>
            Use Current Location
          </button>

          <button
            onClick={() => {
              setFilterProblem("");
              setFilterArea("");
            }}
            className={`${secondaryBtn} bg-gray-700 hover:bg-gray-600 text-white`}
          >
            Clear Filters
          </button>
        </div>

        {/* No results */}
        {filteredReports.length === 0 ? (
          <p className="text-center text-gray-300">No pending reports found.</p>
        ) : (
          filteredReports.map((r) => (
            <div
              key={r._id}
              className="p-6 mb-6 rounded-xl bg-black bg-opacity-60 border border-yellow-400 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-1">{r.problem || r.subtype}</h2>
                  <p className="text-sm text-gray-300 mb-2">{r.subtype ? `Category: ${r.subtype}` : ""}</p>
                  <p className="mb-1"><b>Area:</b> {r.area || "N/A"}</p>
                  <p className="mb-1"><b>Status:</b> {r.status}</p>
                  <p className="mb-2"><b>Description:</b> {r.description}</p>

                  {r.photo && (
                    <img
                      src={r.photo}
                      alt="Reported"
                      className="mt-3 rounded max-w-xs border"
                    />
                  )}
                </div>

                <div className="w-full md:w-[380px] flex flex-col gap-3">
                  <div className="flex gap-2">
                    <button onClick={() => openMap(r)} className={`${primaryBtn} bg-indigo-500 text-white`}>
                      View Map
                    </button>

                    <button
                      onClick={() =>
                        updateReport(r._id, {
                          status: "In Progress",
                        })
                      }
                      className={`${primaryBtn} bg-yellow-400 text-black`}
                    >
                      Mark In Progress
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Add Comment"
                    value={commentInputs[r._id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [r._id]: e.target.value,
                      }))
                    }
                    className="p-2 rounded bg-white text-black border border-yellow-400"
                  />

                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={scheduleInputs[r._id] || ""}
                      min={minDate}
                      onChange={(e) =>
                        setScheduleInputs((prev) => ({
                          ...prev,
                          [r._id]: e.target.value,
                        }))
                      }
                      className="p-2 rounded bg-white text-black border border-yellow-400 text-sm flex-1"
                    />
                    <input
                      type="time"
                      value={timeInputs[r._id] || ""}
                      onChange={(e) =>
                        setTimeInputs((prev) => ({
                          ...prev,
                          [r._id]: e.target.value,
                        }))
                      }
                      className="p-2 rounded bg-white text-black border border-yellow-400 text-sm w-28"
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="Estimated Days to Complete"
                    value={estimatedDaysInputs[r._id] || ""}
                    onChange={(e) =>
                      setEstimatedDaysInputs((prev) => ({
                        ...prev,
                        [r._id]: e.target.value,
                      }))
                    }
                    min={1}
                    className="p-2 rounded bg-white text-black border border-yellow-400"
                  />

                  <div className="flex gap-2 items-center">
                    <label className="cursor-pointer px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white text-sm shadow-md">
                      📸 Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handlePhotoUpload(e, r._id)}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={() =>
                        updateReport(r._id, {
                          comment: commentInputs[r._id],
                          scheduledAt:
                            (scheduleInputs[r._id] || "") +
                            " " +
                            (timeInputs[r._id] || "00:00"),
                          estimatedDays: estimatedDaysInputs[r._id],
                          status: "In Progress",
                        })
                      }
                      className="px-3 py-2 bg-yellow-400 text-black rounded hover:bg-white hover:text-yellow-400 transition-all duration-150 text-sm"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleSubmit(r)}
                      className="px-3 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition-all duration-150 text-sm"
                    >
                      Submit (Resolve)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
