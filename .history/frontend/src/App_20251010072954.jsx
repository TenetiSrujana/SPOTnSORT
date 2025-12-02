// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblesBackground from "./components/BubblesBackground";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserHome from "./pages/User/UserHome";
import ReportForm from "./pages/User/ReportForm";
import UserMap from "./pages/User/UserMap";
import UserAnalysis from "./pages/User/UserAnalysis";
import Rewards from "./pages/User/Rewards";
import ViewReports from "./pages/User/ViewReports";
import AuthHome from "./pages/Authority/AuthHome";
import ManageReport from "./pages/Authority/ManageReport";
import AuthorityAnalysis from "./pages/Authority/AuthorityAnalysis";
import AuthorityMap from "./pages/Authority/AuthorityMap";

function App() {
  return (
    <>
      {/* 🔹 Global Background — Always behind everything */}
      

      {/* 🔹 Page Content */}
      <div className="relative z-10 min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route
            path="/user/home"
            element={
              <PrivateRoute role="user">
                <UserHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/report"
            element={
              <PrivateRoute role="user">
                <ReportForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/map"
            element={
              <PrivateRoute role="user">
                <UserMap />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/analysis"
            element={
              <PrivateRoute role="user">
                <UserAnalysis />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/rewards"
            element={
              <PrivateRoute role="user">
                <Rewards />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/reports"
            element={
              <PrivateRoute role="user">
                <ViewReports />
              </PrivateRoute>
            }
          />
          <Route path="/user/*" element={<Navigate to="/user/home" replace />} />

          {/* Authority Routes */}
          <Route
            path="/authority/home"
            element={
              <PrivateRoute role="authority">
                <AuthHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/authority/manage"
            element={
              <PrivateRoute role="authority">
                <ManageReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/authority/analysis"
            element={
              <PrivateRoute role="authority">
                <AuthorityAnalysis />
              </PrivateRoute>
            }
          />
          <Route
            path="/authority/map"
            element={
              <PrivateRoute role="authority">
                <AuthorityMap />
              </PrivateRoute>
            }
          />
          <Route path="/authority/*" element={<Navigate to="/authority/home" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
