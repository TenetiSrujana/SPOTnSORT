import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from "recharts";
import { FaClipboardList, FaCheckCircle, FaExclamationTriangle, FaMapMarkerAlt } from "react-icons/fa";
import "../../styles/main.css";

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

  const scrollToTop = () => {
    heroRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative text-white overflow-y-auto scroll-smooth min-h-screen">
      <BubblesBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <h1
            className="text-3xl font-extrabold text-yellow-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={scrollToTop}
          >
            SpotnSort Authority
          </h1>
          <ul className="flex space-x-6 font-semibold text-white">
            {["Home", "Assigned Reports", "Analytics", "Map"].map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:text-yellow-400 hover:scale-105 transition"
                onClick={() => {
                  switch (item) {
                    case "Home":
                      scrollToTop();
                      break;
                    case "Assigned Reports":
                      navigate("/authority/manage");
                      break;
                    case "Analytics":
                      navigate("/authority/analysis");
                      break;
                    case "Map":
                      navigate("/authority/map");
                      break;
                    default:
                      break;
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
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-24 relative z-20"
      >
        <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Welcome, <span className="text-yellow-400">Authority Officer</span>
        </h2>
        <p className="text-lg max-w-3xl mb-8 drop-shadow-md">
          Manage assigned civic reports, track problem resolution, and make your city cleaner and safer with <span className="text-yellow-400">SpotnSort</span>.
        </p>
        <button
          onClick={() => navigate("/authority/manage")}
          className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transition z-30 relative"
        >
          View Assigned Reports
        </button>
      </section>

      {/* Rest of sections like How it Works, Analytics, Why Use SpotnSort, Footer remain same */}
    </div>
  );
};

export default AuthorityHome;
