import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../../services/api";

// Marker Icons by status
const statusIcons = {
  Pending: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
  }),
  "In Progress": new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    iconSize: [32, 32],
  }),
  Completed: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
  }),
};

export default function UserMap() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await api.get("/reports");
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    }
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Community Issue Map</h1>

      <MapContainer
        center={[17.385044, 78.486671]} // Hyderabad center
        zoom={7}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((r) => {
          const [lat, lng] = r.location.split(",").map(Number);
          return (
            <Marker
              key={r._id}
              position={[lat, lng]}
              icon={statusIcons[r.status] || statusIcons["Pending"]}
            >
              <Popup>
                <p className="font-bold">{r.category}</p>
                <p>{r.description}</p>
                <p>
                  <b>Status:</b> {r.status}
                </p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
