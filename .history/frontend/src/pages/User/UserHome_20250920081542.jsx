// src/pages/User/UserHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import "../../styles/main.css";

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper relative text-white min-h-screen overflow-x-hidden">
      {/* Bubble background */}
      <BubblesBackground />

      {/* Transparent Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-30 backdrop-blur-sm rounded-b-lg">
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
                className="px-4 py-2 border border-white rounded cursor-pointer hover:bg-yellow-400 hover:text-black transition"
                onClick={() => {
                  switch (item) {
                    case "Home": navigate("/user/home"); break;
                    case "Report": navigate("/user/report"); break;
                    case "Map": navigate("/user/map"); break;
                    case "Analyzer": navigate("/user/analysis"); break;
                    case "Rewards": navigate("/user/rewards"); break;
                    default: break;
                  }
                }}
              >
                {item}
              </li>
            ))}
            <li
              className="px-4 py-2 border border-red-400 rounded cursor-pointer text-red-400 hover:bg-red-400 hover:text-black transition"
              onClick={() => navigate("/")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 mt-24">
        <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Spot the Problem, <span className="text-yellow-400">Sort the City</span>
        </h2>
        <p className="text-lg max-w-3xl mb-6 drop-shadow-md">
          <span className="text-yellow-400">SpotnSort</span> is your{" "}
          <strong>Smart Civic Issue Reporting & Tracking Platform</strong>.  
          Capture problems, report them instantly, and watch your city transform.
        </p>
        <button
          onClick={() => navigate("/user/report")}
          className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transition"
        >
          Report an Issue
        </button>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h3 className="text-3xl font-bold mb-6 text-yellow-400">Why SpotnSort?</h3>
        <p className="max-w-4xl mb-6 text-lg">
          Everyday civic problems like potholes, garbage piles, broken streetlights, 
          and water leaks often go unnoticed or take weeks to resolve.  
          SpotnSort empowers citizens to <span className="text-yellow-400">spot issues</span>,  
          share them with authorities, and track the resolution progress in real time.
        </p>
      </section>

      {/* How it Works Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h3 className="text-3xl font-bold mb-10 text-yellow-400">How It Works</h3>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl">
          {[
            { step: "1. Spot", desc: "See a civic issue? Take a photo and note its location." },
            { step: "2. Report", desc: "Submit the issue on SpotnSort with details and category." },
            { step: "3. Authority Acts", desc: "Local authorities receive and track issues in real time." },
            { step: "4. City Sorted", desc: "Watch updates, progress, and resolved issues on your dashboard." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-black bg-opacity-60 rounded-xl shadow-lg hover:scale-105 transition">
              <h4 className="text-yellow-400 font-bold mb-2">{item.step}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before & After Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h3 className="text-3xl font-bold mb-10 text-yellow-400">Before vs After SpotnSort</h3>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
          <div className="p-6 bg-black bg-opacity-70 rounded-xl shadow-lg hover:scale-105 transition">
            <h4 className="font-bold mb-2 text-yellow-400">Before</h4>
            <p>Problems ignored, delayed responses, messy cities, frustrated citizens.</p>
          </div>
          <div className="p-6 bg-black bg-opacity-70 rounded-xl shadow-lg hover:scale-105 transition">
            <h4 className="font-bold mb-2 text-yellow-400">After</h4>
            <p>Instant reporting, transparent tracking, clean & smart cities.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 text-center py-6 mt-12">
        <p className="text-sm">&copy; {new Date().getFullYear()} SpotnSort. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserHome;
