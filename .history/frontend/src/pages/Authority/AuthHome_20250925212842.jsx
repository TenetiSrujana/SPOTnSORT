import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";

const AuthHome = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  return (
    <div className="relative min-h-screen text-white">
      <BubblesBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <h1
            className="text-3xl font-bold text-yellow-400 cursor-pointer"
            onClick={() => heroRef.current.scrollIntoView({ behavior: "smooth" })}
          >
            SpotnSort Authority
          </h1>
          <ul className="flex gap-6">
            <li className="cursor-pointer" onClick={() => navigate("/authority/home")}>Home</li>
            <li className="cursor-pointer" onClick={() => navigate("/authority/manage")}>Assigned Reports</li>
            <li className="cursor-pointer" onClick={() => navigate("/authority/analysis")}>Analytics</li>
            <li className="cursor-pointer" onClick={() => navigate("/authority/map")}>Map</li>
            <li className="cursor-pointer text-red-400" onClick={() => navigate("/")}>Logout</li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="flex flex-col items-center justify-center min-h-screen pt-32 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Welcome, <span className="text-yellow-400">Authority Officer</span>
        </h2>
        <p className="text-lg mb-8 text-center max-w-2xl">
          Manage assigned civic reports, track problem resolution, and make your city cleaner and safer with SpotnSort.
        </p>
        <button
          onClick={() => navigate("/authority/manage")}
          className="px-8 py-3 bg-yellow-400 text-black font-bold rounded hover:scale-105 transition"
        >
          View Assigned Reports
        </button>
      </section>
    </div>
  );
};

export default AuthHome;
