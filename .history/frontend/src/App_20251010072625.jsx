// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BubblesBackground from "./components/BubblesBackground";

import Home from "./pages/Home";
import UserMap from "./pages/User/UserMap";
import ReportLost from "./pages/User/ReportLost";
import ClaimItem from "./pages/User/ClaimItem";
import AuthorityDashboard from "./pages/Authority/AuthorityDashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      {/* Background for all pages */}
      <BubblesBackground />

      {/* Persistent Navbar */}
      <Navbar />

      {/* Routes */}
      <div className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/map" element={<UserMap />} />
          <Route path="/user/report" element={<ReportLost />} />
          <Route path="/user/claim" element={<ClaimItem />} />
          <Route path="/authority/dashboard" element={<AuthorityDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Persistent Footer */}
      <Footer />
    </Router>
  );
}

export default App;
