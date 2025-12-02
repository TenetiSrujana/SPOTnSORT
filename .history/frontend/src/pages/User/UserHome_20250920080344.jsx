// src/pages/User/UserHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import "../../styles/main.css";

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper relative text-white">
      {/* Bubble background */}
      <BubblesBackground />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-5xl font-bold mb-4">
          Spot the Problem,{" "}
          <span className="text-yellow-500">Sort the City</span>
        </h2>
        <p className="text-lg max-w-3xl">
          <span className="text-yellow-500">SpotnSort</span> is your{" "}
          <strong>Smart Civic Issue Reporting & Tracking Platform</strong>.  
          Capture problems, report them instantly, and watch your city transform.
        </p>
        <button
          onClick={() => navigate("/user/report")}
          className="mt-8 px-6 py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
        >
          Report an Issue
        </button>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h3 className="text-3xl font-bold mb-6">Why SpotnSort?</h3>
        <p className="max-w-4xl mb-6">
          Everyday civic problems like potholes, garbage piles, broken
          streetlights, and water leaks often go unnoticed or take weeks to
          resolve.  
          SpotnSort empowers citizens to{" "}
          <span className="text-yellow-500">spot issues</span>,  
          share them with authorities, and track the resolution progress in
          real time.
        </p>
      </section>

      {/* How it Works Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h3 className="text-3xl font-bold mb-10">How It Works</h3>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl">
          <div className="p-6 bg-black bg-opacity-70 rounded shadow-lg">
            <h4 className="text-yellow-500 font-bold mb-2">1. Spot</h4>
            <p>See a civic issue? Take a photo and note its location.</p>
          </div>
          <div className="p-6 bg-black bg-opacity-70 rounded shadow-lg">
            <h4 className="text-yellow-500 font-bold mb-2">2. Report</h4>
            <p>Submit the issue on SpotnSort with details and category.</p>
          </div>
          <div className="p-6 bg-black bg-opacity-70 rounded shadow-lg">
            <h4 className="text-yellow-500 font-bold mb-2">3. Authority Acts</h4>
            <p>Local authorities receive and track issues in real time.</p>
          </div>
          <div className="p-6 bg-black bg-opacity-70 rounded shadow-lg">
            <h4 className="text-yellow-500 font-bold mb-2">4. City Sorted</h4>
            <p>Watch updates, progress, and resolved issues on your dashboard.</p>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h3 className="text-3xl font-bold mb-10">Before vs After SpotnSort</h3>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
          <div className="p-6 bg-red-900 bg-opacity-70 rounded shadow-lg">
            <h4 className="font-bold mb-2">Before</h4>
            <p>
              Problems ignored, delayed responses, messy cities, frustrated
              citizens.
            </p>
          </div>
          <div className="p-6 bg-green-900 bg-opacity-70 rounded shadow-lg">
            <h4 className="font-bold mb-2">After</h4>
            <p>
              Instant reporting, transparent tracking, clean & smart cities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 text-center py-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SpotnSort. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default UserHome;
