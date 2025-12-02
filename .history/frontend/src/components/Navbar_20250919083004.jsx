import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/assets/logo.png" alt="SpotnSort" style={{height:40, marginRight:8}}/>
          SpotnSort
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item me-2"><span className="nav-link">Hi, {user.name}</span></li>
                <li className="nav-item"><button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item me-2"><Link className="btn btn-outline-primary" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="btn btn-primary" to="/register">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
