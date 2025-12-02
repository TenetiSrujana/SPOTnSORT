import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Authority Home / Dashboard
 * Shows totals (Pending, In Progress, Completed), recent reports filtered by authority's area & category,
 * scrolling ratings (simulated), and list of assigned reports with manage/open actions.
 */
export default function AuthHome() {
  const navigate = useNavigate();
  const [authority, setAuthority] = useState(null);
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const cur = JSON.parse(localStorage.getItem("currentUser"));
    if (!cur || cur.role !== "authority") {
      navigate("/login");
      return;
    }
    setAuthority(cur);

    const all = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(all);

    // Filter reports relevant to this authority: by area (or if authority covers 'All', get all)
    const myArea = cur.area || "";
    const myCategory = cur.category || ""; // optional
    const filt = all.filter((r) => {
      const areaMatch = !myArea || (r.area && r.area.toLowerCase().includes(myArea.toLowerCase()));
      const catMatch = !myCategory || (r.type && r.type.toLowerCase() === myCategory.toLowerCase());
      return areaMatch && catMatch;
    });

    setFiltered(filt);

    const s = filt.reduce(
      (acc, r) => {
        acc.total += 1;
        if (r.status === "Pending") acc.pending += 1;
        else if (r.status === "In Progress") acc.inProgress += 1;
        else if (r.status === "Completed") acc.completed += 1;
        return acc;
      },
      { total: 0, pending: 0, inProgress: 0, completed: 0 }
    );
    setStats(s);

    // Simulated ratings from reports feedback (if report.rating exists)
    const rs = filt
      .map((r) => r.rating)
      .filter(Boolean)
      .slice(-20)
      .reverse()
      .map((val, idx) => ({ id: idx + 1, score: val, comment: `Citizen rating ${val}` }));
    setRatings(rs);
  }, [navigate]);

  // Open manage view: store selected report id then navigate
  const openReport = (id) => {
    localStorage.setItem("selectedReportId", id);
    navigate("/authority/manage");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Authority Dashboard</h1>
            <p className="text-sm text-gray-600">Area: <strong>{authority?.area || "Not set"}</strong> — Category: <strong>{authority?.category || "All"}</strong></p>
          </div>

          <nav className="flex gap-3 items-center">
            <Link to="/authority/home" className="px-3 py-2 border rounded">Home</Link>
            <Link to="/authority/add" className="px-3 py-2 bg-blue-600 text-white rounded">Add / Submit</Link>
            <Link to="/authority/map" className="px-3 py-2 border rounded">Map</Link>
            <Link to="/authority/analysis" className="px-3 py-2 border rounded">Analysis</Link>
            <Link to="/authority/rewards" className="px-3 py-2 border rounded">Rewards</Link>
          </nav>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-sm text-gray-500">Total Reports</div>
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-sm text-gray-500">In Progress</div>
            <div className="text-3xl font-bold text-orange-600">{stats.inProgress}</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          </div>
        </section>

        {/* Main content: left = list, right = ratings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Assigned Reports</h3>
              <div className="text-sm text-gray-600">Showing latest {filtered.length}</div>
            </div>

            {filtered.length === 0 ? (
              <p className="text-gray-500">No reports assigned to your area/category yet.</p>
            ) : (
              <ul className="space-y-3">
                {filtered.slice().reverse().map((r) => (
                  <li key={r.id} className="p-3 border rounded-md flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <img src={r.photo || "/placeholder-issue.png"} alt="thumb" className="w-20 h-16 object-cover rounded border" />
                      <div>
                        <div className="font-semibold">{r.type || r.title}</div>
                        <div className="text-xs text-gray-500">{r.area} • {new Date(r.createdAt).toLocaleString()}</div>
                        <div className="text-sm text-gray-700 mt-2">{r.description?.slice(0, 120)}</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        r.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        r.status === "In Progress" ? "bg-orange-100 text-orange-700" :
                        "bg-green-100 text-green-700"
                      }`}>{r.status}</span>

                      <div className="flex gap-2">
                        <button onClick={()=>openReport(r.id)} className="px-3 py-1 bg-blue-600 text-white rounded">Open</button>
                        <button onClick={()=>{
                          // quick mark In Progress
                          const all = JSON.parse(localStorage.getItem("reports")) || [];
                          const idx = all.findIndex(x => x.id === r.id);
                          if(idx >= 0){ all[idx].status = "In Progress"; localStorage.setItem("reports", JSON.stringify(all)); window.location.reload(); }
                        }} className="px-3 py-1 border rounded">Start</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Recent Ratings</h4>
            <div className="scrolling-ratings space-y-2 max-h-52 overflow-auto">
              {ratings.length === 0 ? <div className="text-gray-500 text-sm">No ratings yet.</div> :
                ratings.map(r => (
                  <div key={r.id} className="p-2 border rounded">
                    <div className="text-sm font-medium">Score: {r.score} / 5</div>
                    <div className="text-xs text-gray-600">{r.comment}</div>
                  </div>
                ))
              }
            </div>

            <div className="mt-4">
              <h5 className="font-semibold">Quick Actions</h5>
              <ul className="mt-2 space-y-2 text-sm">
                <li><button onClick={()=>navigate("/authority/map")} className="text-blue-600 hover:underline">Open Map</button></li>
                <li><button onClick={()=>navigate("/authority/analysis")} className="text-blue-600 hover:underline">View Analysis</button></li>
                <li><button onClick={()=>navigate("/authority/rewards")} className="text-blue-600 hover:underline">Rewards</button></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
