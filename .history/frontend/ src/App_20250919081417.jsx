import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserHome from "./pages/User/UserHome";
import AuthHome from "./pages/Authority/AuthHome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { getCurrentUser } from "./services/auth";

function PrivateRoute({ children, roles }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/user/home" element={
            <PrivateRoute roles={["user"]}><UserHome /></PrivateRoute>
          }/>

          <Route path="/authority/home" element={
            <PrivateRoute roles={["authority"]}><AuthHome /></PrivateRoute>
          }/>

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
