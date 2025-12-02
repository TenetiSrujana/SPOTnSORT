import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function UserHome() {
  const [stats, setStats] = useState({
    totalReports: 0,
    inProgress: 0,
    completed: 0,
  });
  const [recentReports, setRecentReports] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await api.get("/auth/me");
        setUser(resUser.data);

        const resStats = await api.get("/user/stats");
        setStats(resStats.data);

        const resRecent = await api.get("/user/reports/recent");
        setRecentReports(resRecent.data);

        const resNotif = await api.get("/user/notifications");
        setNotifications(resNotif.data);
      } catch (err) {
        console.error("Error loading user home:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, {user?.fullName || "User"} 👋
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <p className="text-gray-600">Total Reports</p>
          <h2 className="text-2xl font-bold">{stats.totalReports}</h2>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <p className="text-gray-600">In Progress</p>
          <h2 className="text-2xl font-bold">{stats.inProgress}</h2>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <p className="text-gray-600">Completed</p>
          <h2 className="text-2xl font-bold">{stats.completed}</h2>
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Recent Reports</h2>
        {recentReports.length === 0 ? (
          <p className="text-gray-500">No recent reports yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentReports.map((r) => (
              <li
                key={r._id}
                className="border rounded-lg p-3 shadow bg-white flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{r.category}</p>
                  <p className="text-sm text-gray-600">{r.description}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    r.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : r.status === "In Progress"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notifications Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No new notifications.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <li key={i} className="p-3 border rounded-lg bg-gray-50 shadow">
                {n.message}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
