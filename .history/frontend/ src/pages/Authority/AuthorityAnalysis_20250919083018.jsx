import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

/**
 * AuthorityAnalysis:
 * - Issues over time (line)
 * - Category distribution (pie)
 * - Department / Area ranking (bar) - simple counts by area
 */
export default function AuthorityAnalysis() {
  const [reports, setReports] = useState([]);
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const cur = JSON.parse(localStorage.getItem("currentUser"));
    if (!cur) return;
    const all = JSON.parse(localStorage.getItem("reports")) || [];
    const myArea = cur.area || "";
    const myCategory = cur.category || "";
    const filt = all.filter((r) => {
      const areaMatch = !myArea || (r.area && r.area.toLowerCase().includes(myArea.toLowerCase()));
      const catMatch = !myCategory || (r.type && r.type.toLowerCase() === myCategory.toLowerCase());
      return areaMatch && catMatch;
    });
    setReports(filt);

    // Prepare data for charts
    // 1) issues over time (group by date)
    const byDate = {};
    filt.forEach(r => {
      const d = new Date(r.createdAt).toISOString().slice(0,10);
      byDate[d] = (byDate[d] || 0) + 1;
    });
    const dates = Object.keys(byDate).sort();
    const counts = dates.map(d => byDate[d]);

    // 2) category dist
    const byCat = {};
    filt.forEach(r => { byCat[r.type] = (byCat[r.type] || 0) + 1; });

    // 3) area ranking
    const byArea = {};
    filt.forEach(r => { byArea[r.area || "Unknown"] = (byArea[r.area || "Unknown"] || 0) + 1; });

    // create charts
    if (lineRef.current) {
      new Chart(lineRef.current, {
        type: 'line',
        data: { labels: dates, datasets: [{ label: 'Reports', data: counts, fill: false, tension: 0.2 }] },
        options: { responsive: true }
      });
    }

    if (pieRef.current) {
      new Chart(pieRef.current, {
        type: 'pie',
        data: { labels: Object.keys(byCat), datasets: [{ data: Object.values(byCat) }] },
        options: { responsive: true }
      });
    }

    if (barRef.current) {
      new Chart(barRef.current, {
        type: 'bar',
        data: { labels: Object.keys(byArea), datasets: [{ label: 'Reports', data: Object.values(byArea) }] },
        options: { responsive: true }
      });
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Authority Analysis</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded">
            <h4 className="text-sm font-semibold mb-2">Issues Over Time</h4>
            <canvas ref={lineRef} />
          </div>

          <div className="p-4 border rounded">
            <h4 className="text-sm font-semibold mb-2">Category Distribution</h4>
            <canvas ref={pieRef} />
          </div>

          <div className="md:col-span-2 p-4 border rounded">
            <h4 className="text-sm font-semibold mb-2">Reports by Area (Ranking)</h4>
            <canvas ref={barRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
