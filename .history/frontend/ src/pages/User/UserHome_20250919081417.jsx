import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    // Fetch reports for this user (from localStorage for now)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allReports = JSON.parse(localStorage.getItem("reports")) || [];
    const userReports = allReports.filter((r) => r.userEmail === currentUser.email);

    setReports(userReports);

    // Stats
    const pending = userReports.filter((r) => r.status === "Pending").length;
    const inProgress = userReports.filter((r) => r.status === "In Progress").length;
    const completed = userReports.filter((r) => r.status === "Completed").length;

    setStats({
      total: userReports.length,
      pending,
      inProgress,
      completed,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        <nav className="space-x-4">
          <Link to="/user/report" className="text-blue-600 hover:underline">Report Issue</Link>
          <Link to="/user/map" className="text-blue-600 hover:underline">Map</Link>
          <Link to="/user/analysis" className="text-blue-600 hover:underline">Analysis</Link>
          <Link to="/user/rewards" className="text-blue-600 hover:underline">Rewards</Link>
        </nav>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Reports</h2>
          <p className="text-2xl text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">In Progress</h2>
          <p className="text-2xl text-orange-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-2xl text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports submitted yet.</p>
        ) : (
          <ul className="space-y-3">
            {reports.slice(-5).reverse().map((report, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{report.title}</p>
                  <p className="text-sm text-gray-600">{report.description}</p>
                  <p className="text-xs text-gray-400">Status: {report.status}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : report.status === "In Progress"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {report.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
