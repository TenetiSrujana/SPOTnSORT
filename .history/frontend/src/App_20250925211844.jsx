import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
    <div className="relative flex flex-col min-h-screen text-white overflow-auto scroll-smooth">
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
        <Route path="/user/*" element={<Navigate to="/user/home" />} />

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
        <Route path="/authority/*" element={<Navigate to="/authority/home" />} />
      </Routes>
    </div>
  );
}

export default App;
