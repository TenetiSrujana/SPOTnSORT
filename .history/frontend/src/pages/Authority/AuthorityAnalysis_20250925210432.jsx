// src/pages/Authority/AuthorityAnalysis.jsx
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const AuthorityAnalysis = () => {
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const allReports = JSON.parse(localStorage.getItem("reports")) || [];

    const byDate = {};
    const byCategory = {};
    const byArea = {};

    allReports.forEach((r) => {
      const date = new Date(r.createdAt).toISOString().slice(0, 10);
      byDate[date] = (byDate[date] || 0) + 1;

      byCategory[r.category] = (byCategory[r.category] || 0) + 1;

      const area = r.area || "Unknown";
      byArea[area] = (byArea[area] || 0) + 1;
    });

    // Line chart
    if (lineRef.current) {
      new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: Object.keys(byDate).sort(),
          datasets: [
            {
              label: "Reports",
              data: Object.values(byDate),
              borderColor: "#FFD700",
              backgroundColor: "#FFD700",
              fill: false,
            },
          ],
        },
      });
    }

    // Pie chart
    if (pieRef.current) {
      new Chart(pieRef.current, {
        type: "pie",
        data: {
          labels: Object.keys(byCategory),
          datasets: [
            {
              data: Object.values(byCategory),
              backgroundColor: ["#FFD700", "#00FFAA", "#FF6347", "#1E90FF", "#FF69B4"],
            },
          ],
        },
      });
    }

    // Bar chart
    if (barRef.current) {
      new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: Object.keys(byArea),
          datasets: [
            {
              label: "Reports",
              data: Object.values(byArea),
              backgroundColor: "#FFD700",
            },
          ],
        },
      });
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">Authority Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-black bg-opacity-60 p-4 rounded shadow">
          <h4 className="mb-2 font-semibold">Reports Over Time</h4>
          <canvas ref={lineRef} />
        </div>
        <div className="bg-black bg-opacity-60 p-4 rounded shadow">
          <h4 className="mb-2 font-semibold">Category Distribution</h4>
          <canvas ref={pieRef} />
        </div>
        <div className="md:col-span-2 bg-black bg-opacity-60 p-4 rounded shadow">
          <h4 className="mb-2 font-semibold">Reports by Area</h4>
          <canvas ref={barRef} />
        </div>
      </div>
    </div>
  );
};

export default AuthorityAnalysis;
