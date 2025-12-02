// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Landing
import Landing from "./pages/Landing";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// User Pages
import UserHome from "./pages/User/UserHome";
import ReportForm from "./pages/User/ReportForm";
import UserMap from "./pages/User/UserMap";
import UserAnalysis from "./pages/User/UserAnalysis";
import Rewards from "./pages/User/Rewards";

// Authority Pages
import AuthHome from "./pages/Authority/AuthHome";
import AuthorityMap from "./pages/Authority/AuthorityMap";
import AuthorityAnalysis from "./pages/Authority/AuthorityAnalysis";
import ManageReport from "./pages/Authority/ManageReport";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Show Navbar on all pages except landing/login/register */}
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />

          {/* Protected User Routes */}
          <Route
            path="/user/*"
            element={
              <PrivateRoute role="user">
                <Navbar />
                <div className="flex-grow">
                  <Routes>
                    <Route path="home" element={<UserHome />} />
                    <Route path="report" element={<ReportForm />} />
                    <Route path="map" element={<UserMap />} />
                    <Route path="analysis" element={<UserAnalysis />} />
                    <Route path="rewards" element={<Rewards />} />
                    <Route path="*" element={<Navigate to="home" />} />
                  </Routes>
                </div>
                <Footer />
              </PrivateRoute>
            }
          />

          {/* Protected Authority Routes */}
          <Route
            path="/authority/*"
            element={
              <PrivateRoute role="authority">
                <Navbar />
                <div className="flex-grow">
                  <Routes>
                    <Route path="home" element={<AuthHome />} />
                    <Route path="map" element={<AuthorityMap />} />
                    <Route path="analysis" element={<AuthorityAnalysis />} />
                    <Route path="manage" element={<ManageReport />} />
                    <Route path="*" element={<Navigate to="home" />} />
                  </Routes>
                </div>
                <Footer />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
