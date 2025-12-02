import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Rewards() {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchRewards() {
      try {
        const resPoints = await api.get("/user/rewards/points");
        setPoints(resPoints.data.points);

        const resRewards = await api.get("/user/rewards/available");
        setRewards(resRewards.data);

        const resHistory = await api.get("/user/rewards/history");
        setHistory(resHistory.data);
      } catch (err) {
        console.error("Error loading rewards:", err);
      }
    }
    fetchRewards();
  }, []);

  // calculate next milestone
  const nextMilestone = 100; // example threshold
  const progress = Math.min((points / nextMilestone) * 100, 100);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Your Rewards 🎁</h1>

      {/* Points & Progress */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg">Your Points Balance:</p>
        <h2 className="text-3xl font-bold text-blue-600">{points} pts</h2>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Next reward unlocks at {nextMilestone} points
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
        {rewards.length === 0 ? (
          <p className="text-gray-500">No rewards available yet.</p>
        ) : (
          <ul className="space-y-3">
            {rewards.map((r) => (
              <li
                key={r._id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-sm text-gray-600">{r.description}</p>
                </div>
                <span className="text-blue-600 font-bold">
                  {r.cost} pts
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Reward History */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Reward History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No rewards claimed yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h, i) => (
              <li key={i} className="p-2 border rounded bg-gray-50">
                🎉 You redeemed <b>{h.title}</b> on {new Date(h.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
