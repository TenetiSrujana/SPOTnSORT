// src/pages/User/UserHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { FaCamera, FaPaperPlane, FaUserCheck, FaCheckCircle, FaLightbulb, FaCity } from "react-icons/fa";
import "../../styles/main.css";

const reportData = [
  { name: "Jan", Reports: 5, Resolved: 2 },
  { name: "Feb", Reports: 8, Resolved: 6 },
  { name: "Mar", Reports: 12, Resolved: 10 },
  { name: "Apr", Reports: 7, Resolved: 5 },
  { name: "May", Reports: 15, Resolved: 12 },
];

const categoryData = [
  { category: "Potholes", count: 12 },
  { category: "Garbage", count: 20 },
  { category: "Streetlights", count: 8 },
  { category: "Water Leakage", count: 6 },
];

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative text-white overflow-y-auto scroll-smooth">

      {/* Fixed Bubbles Background */}
<div className="fixed top-0 left-0 w-full h-full -z-10">
  <BubblesBackground />
</div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <h1
            className="text-3xl font-extrabold text-yellow-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/user/home")}
          >
            SpotnSort
          </h1>
          <ul className="flex space-x-6 font-semibold text-white">
            {["Home", "Report", "Map", "Analyzer", "Rewards"].map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:text-yellow-400 hover:scale-105 transition"
                onClick={() => {
                  switch (item) {
                    case "Home": navigate("/user/home"); break;
                    case "Report": navigate("/user/report"); break;
                    case "Map": navigate("/user/map"); break;
                    case "Analyzer": navigate("/user/analysis"); break;
                    case "Rewards": navigate("/user/rewards"); break;
                  }
                }}
              >
                {item}
              </li>
            ))}
            <li
              className="px-4 py-2 cursor-pointer text-red-400 hover:text-red-500 hover:scale-105 transition"
              onClick={() => navigate("/")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-24">
        <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Spot the Problem, <span className="text-yellow-400">Sort the City</span>
        </h2>
        <p className="text-lg max-w-3xl mb-8 drop-shadow-md">
          <span className="text-yellow-400">SpotnSort</span> is your{" "}
          <strong>Smart Civic Issue Reporting & Tracking Platform</strong>.  
          Identify civic problems, report them instantly, and watch your city transform.
        </p>
        <button
          onClick={() => navigate("/user/report")}
          className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transition"
        >
          Report an Issue
        </button>
      </section>

      {/* How It Works */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 bg-black bg-opacity-40 backdrop-blur-sm w-full">
        <h3 className="text-4xl font-bold mb-12 text-yellow-400">How SpotnSort Works</h3>
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto text-left">
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaCamera className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Step 1: Spot the Issue</h4>
            <p>Identify a civic problem like potholes, broken lights, garbage, etc., and capture a photo.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaPaperPlane className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Step 2: Report Instantly</h4>
            <p>Submit details including location, category, and description using SpotnSort.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaUserCheck className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Step 3: Authority Verification</h4>
            <p>Authorities receive notifications, verify the issue, and take action quickly.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaCheckCircle className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Step 4: Track & Resolve</h4>
            <p>Watch the issue resolution on your dashboard with real-time updates and analytics.</p>
          </div>
        </div>
      </section>

      {/* Impact & Recent Reports */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24">
        <h3 className="text-4xl font-bold mb-12 text-yellow-400">Impact & Recent Reports</h3>
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-8 md:space-y-0 max-w-6xl mx-auto">
          <div className="flex-1 p-6 bg-black bg-opacity-50 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold mb-3 text-yellow-400">Before SpotnSort</h4>
            <p>Potholes, garbage, broken infrastructure remained unnoticed. Citizens frustrated.</p>
            <img src="/assets/before.jpg" alt="Before" className="mt-4 rounded shadow-md" />
          </div>
          <div className="flex-1 p-6 bg-black bg-opacity-50 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold mb-3 text-yellow-400">After SpotnSort</h4>
            <p>Instant reporting, quick action, clean & smart cities with citizen engagement.</p>
            <img src="/assets/after.jpg" alt="After" className="mt-4 rounded shadow-md" />
          </div>
        </div>
      </section>

      {/* Analytics Graphs */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24 bg-black bg-opacity-40 backdrop-blur-sm w-full space-y-12">
        <h3 className="text-4xl font-bold text-yellow-400">Analytics & Trends</h3>

        {/* Line Chart */}
        <div className="w-full max-w-4xl h-80 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#FFD700" />
              <YAxis stroke="#FFD700" />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #FFD700" }} />
              <CartesianGrid stroke="#444" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="Reports" stroke="#FFD700" strokeWidth={2} />
              <Line type="monotone" dataKey="Resolved" stroke="#00FFAA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Categories */}
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

      {/* Tips & Benefits */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24">
        <h3 className="text-4xl font-bold mb-12 text-yellow-400">Why Use SpotnSort?</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaLightbulb className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Be Informed</h4>
            <p>Get real-time updates about civic issues in your area.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaCity className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Engage with City</h4>
            <p>Participate actively in improving your city’s infrastructure.</p>
          </div>
          <div className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <FaCheckCircle className="text-yellow-400 text-4xl mb-4" />
            <h4 className="text-2xl font-semibold mb-2 text-yellow-400">Track Progress</h4>
            <p>See how reported issues get resolved with transparency.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 text-center py-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} SpotnSort. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserHome;
