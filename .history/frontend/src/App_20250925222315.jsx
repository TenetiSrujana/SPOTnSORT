// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthHome from "./pages/Authority/AuthHome";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authority Routes */}
      <Route
        path="/authority/home"
        element={
          <PrivateRoute role="authority">
            <AuthHome />
          </PrivateRoute>
        }
      />
      <Route path="/authority/*" element={<Navigate to="/authority/home" replace />} />
    </Routes>
  );
}

export default App;
