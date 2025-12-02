// src/pages/Authority/AuthorityHome.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { FaClipboardList, FaCheckCircle, FaExclamationTriangle, FaMapMarkerAlt, FaLightbulb, FaCity } from "react-icons/fa";

const reportData = [
  { name: "Jan", ReportsAssigned: 10, ReportsResolved: 7 },
  { name: "Feb", ReportsAssigned: 15, ReportsResolved: 12 },
  { name: "Mar", ReportsAssigned: 12, ReportsResolved: 10 },
  { name: "Apr", ReportsAssigned: 8, ReportsResolved: 6 },
  { name: "May", ReportsAssigned: 20, ReportsResolved: 18 },
];

const categoryData = [
  { category: "Potholes", count: 12 },
  { category: "Garbage", count: 20 },
  { category: "Streetlights", count: 8 },
  { category: "Water Leakage", count: 6 },
  { category: "Traffic", count: 5 },
];

const AuthorityHome = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const scrollToTop = () => heroRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative text-white overflow-y-auto scroll-smooth min-h-screen">
      <BubblesBackground />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-24 relative z-10"
      >
        <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Welcome, <span className="text-yellow-400">Authority Officer</span>
        </h2>
        <p className="text-lg max-w-3xl mb-8 drop-shadow-md">
          Manage assigned civic reports, track problem resolution, and make your city cleaner and safer with <span className="text-yellow-400">SpotnSort</span>.
        </p>

        {/* Functional buttons like AuthHome */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            className="px-6 py-3 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
            onClick={() => navigate("/authority/manage")}
          >
            View Assigned Reports
          </button>
          <button
            className="px-6 py-3 bg-green-500 text-black rounded hover:bg-green-600 transition"
            onClick={() => navigate("/authority/analysis")}
          >
            Analytics
          </button>
          <button
            className="px-6 py-3 bg-blue-500 text-black rounded hover:bg-blue-600 transition"
            onClick={() => navigate("/authority/map")}
          >
            Map
          </button>
        </div>

        <button
          className="px-6 py-3 bg-red-500 text-black rounded hover:bg-red-600 transition"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </section>

      {/* How It Works */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 bg-black bg-opacity-40 backdrop-blur-sm w-full relative z-10">
        <h3 className="text-4xl font-bold mb-12 text-yellow-400">How Authorities Work with SpotnSort</h3>
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto text-left">
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaClipboardList className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Receive Reports</h4>
            <p>Get real-time notifications of civic issues reported by citizens in your area.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaMapMarkerAlt className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Locate & Inspect</h4>
            <p>Visit the problem location or coordinate with your team for assessment.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaCheckCircle className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Take Action</h4>
            <p>Resolve issues like garbage, potholes, street lights, and update status in the system.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaExclamationTriangle className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Track & Verify</h4>
            <p>Monitor reported problems, verify resolutions, and maintain accountability.</p>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 bg-black bg-opacity-40 backdrop-blur-sm w-full space-y-12 relative z-10">
        <h3 className="text-4xl font-bold text-yellow-400 mb-8">Assigned Reports & Resolution Trends</h3>
        <div className="w-full max-w-4xl h-80 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#FFD700" />
              <YAxis stroke="#FFD700" />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #FFD700" }} />
              <CartesianGrid stroke="#444" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="ReportsAssigned" stroke="#FFD700" strokeWidth={2} />
              <Line type="monotone" dataKey="ReportsResolved" stroke="#00FFAA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full max-w-4xl h-80 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="category" stroke="#FFD700" />
              <YAxis stroke="#FFD700" />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #FFD700" }} />
              <Legend wrapperStyle={{ color: "#FFD700" }} />
              <Bar dataKey="count" fill="#FFD700" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default AuthorityHome;
