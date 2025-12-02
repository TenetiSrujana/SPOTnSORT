// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

/**
 * A wrapper component for protecting routes.
 * @param {string} role - "user" or "authority"
 */
const PrivateRoute = ({ role, children }) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    // Role mismatch → redirect to landing
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
