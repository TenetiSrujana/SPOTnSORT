import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

/**
 * AuthorityMap:
 * - Shows Telangana map region (centered)
 * - Displays markers for reports (filtered by authority area/category)
 * - Clicking marker shows details and a button to open ManageReport
 */

// default marker icon fix for leaflet in many bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function AuthorityMap() {
  const navigate = useNavigate();
  const [authority, setAuthority] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const cur = JSON.parse(localStorage.getItem("currentUser"));
    if (!cur || cur.role !== "authority") {
      navigate("/login");
      return;
    }
    setAuthority(cur);
    const all = JSON.parse(localStorage.getItem("reports")) || [];
    const myArea = cur.area || "";
    const myCategory = cur.category || "";
    const filt = all.filter((r) => {
      const areaMatch = !myArea || (r.area && r.area.toLowerCase().includes(myArea.toLowerCase()));
      const catMatch = !myCategory || (r.type && r.type.toLowerCase() === myCategory.toLowerCase());
      return areaMatch && catMatch;
    });
    setReports(filt);
  }, [navigate]);

  // Telangana approximate center coords
  const center = [18.1124, 79.0193];
  const zoom = 7;

  const openManage = (id) => {
    localStorage.setItem("selectedReportId", id);
    navigate("/authority/manage");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Authority Map — Telangana</h2>
        <MapContainer center={center} zoom={zoom} style={{ height: "600px", borderRadius: 8 }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {reports.map((r) => {
            // fallback: if no lat/lng, skip marker
            if (!r.lat || !r.lng) return null;
            return (
              <Marker key={r.id} position={[r.lat, r.lng]}>
                <Popup>
                  <div className="p-1">
                    <div className="font-semibold">{r.type}</div>
                    <div className="text-xs text-gray-600">{r.area}</div>
                    <div className="text-sm mt-2">{r.description?.slice(0, 120)}</div>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => openManage(r.id)} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Open</button>
                      <button onClick={()=>{
                        // quick mark completed
                        const all = JSON.parse(localStorage.getItem("reports")) || [];
                        const idx = all.findIndex(x=>x.id===r.id);
                        if(idx >= 0){ all[idx].status = "Completed"; localStorage.setItem("reports", JSON.stringify(all)); window.location.reload(); }
                      }} className="px-2 py-1 border rounded text-xs">Mark Completed</button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
