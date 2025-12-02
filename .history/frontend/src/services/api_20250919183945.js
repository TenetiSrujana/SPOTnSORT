// src/services/api.js
import axios from "axios";
import { getCurrentUser } from "./auth";
import { BASE_URL } from "../config";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL, // defined in config.js
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const currentUser = getCurrentUser();
    if (currentUser?.token) {
      config.headers.Authorization = `Bearer ${currentUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global responses / errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized → logout
      localStorage.removeItem("spotnsort_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
