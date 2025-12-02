import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth"; // from outside src


const PrivateRoute = ({ children, role }) => {
  const user = getCurrentUser();

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
