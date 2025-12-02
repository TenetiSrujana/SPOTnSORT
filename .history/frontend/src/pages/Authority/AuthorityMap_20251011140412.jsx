import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom arrow marker
const arrowIcon = new L.Icon({
  iconUrl: "/arrow-marker.png", // put in public folder
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

export default function ReportsMap({ role }) {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");

  const telanganaBounds = [
    [15.895, 77.156],
    [19.458, 81.676],
  ];
  const telanganaCenter = [17.5868, 78.1134];

  // Fetch reports from backend
  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/reports");
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5000); // live update every 5s
    return () => clearInterval(interval);
  }, []);

  const getColor = (status) => (status === "Resolved" ? "green" : "red");

  const displayedReports = reports.filter((r) => (filter === "all" ? true : r.problem === filter));

  return (
    <div className="relative min-h-screen text-white">

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <FaArrowLeft
            className="text-yellow-400 text-2xl mr-4 cursor-pointer hover:scale-110 transition"
            onClick={() =>
              role === "user" ? navigate("/user/home") : navigate("/authority/home")
            }
          />
          <h1 className="text-3xl font-extrabold text-yellow-400 text-center flex-1">
            Telangana Reports Map
          </h1>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded bg-gray-900 text-white"
            >
              <option value="all">All Problems</option>
              <option value="Garbage">Garbage</option>
              <option value="Street Lights">Street Lights</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Trees">Trees</option>
              <option value="Potholes">Potholes</option>
              <option value="Traffic Congestion">Traffic Congestion</option>
              <option value="Public Amenities">Public Amenities</option>
            </select>
          </div>
        </div>
      </header>

      {/* Map */}
      <div className="pt-20 w-full h-screen">
        <MapContainer
          center={telanganaCenter}
          zoom={7.5}
          scrollWheelZoom={true}
          className="w-full h-full rounded-xl shadow-lg"
          maxBounds={telanganaBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {displayedReports.map(
            (r) =>
              r.lat &&
              r.lng && (
                <Marker key={r._id} position={[r.lat, r.lng]} icon={arrowIcon}>
                  <Popup className="bg-black text-white p-2 rounded-lg">
                    <strong>Problem:</strong> {r.problem} <br />
                    <strong>Subtype:</strong> {r.subtype} <br />
                    <strong>Priority:</strong> {r.priority} <br />
                    <strong>Description:</strong> {r.description} <br />
                    <strong>Status:</strong>{" "}
                    <span className={r.status === "Resolved" ? "text-green-400" : "text-red-400"}>
                      {r.status}
                    </span>
                    <br />
                    {r.name && (
                      <>
                        <strong>Reported by:</strong> {r.name} <br />
                      </>
                    )}
                  </Popup>
                  <Tooltip>{r.problem}</Tooltip>
                </Marker>
              )
          )}

          {displayedReports.map(
            (r) =>
              r.lat &&
              r.lng && (
                <CircleMarker
                  key={"circle" + r._id}
                  center={[r.lat, r.lng]}
                  radius={12}
                  color={getColor(r.status)}
                  fillOpacity={0.3}
                />
              )
          )}
        </MapContainer>
      </div>
    </div>
  );
}
