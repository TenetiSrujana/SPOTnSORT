// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth"; // make sure this path is correct

const PrivateRoute = ({ children, role }) => {
  const user = getCurrentUser();

  // If user not logged in or role mismatch, redirect to login
  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
