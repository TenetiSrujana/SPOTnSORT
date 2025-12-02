// src/services/auth.js
import api from "./api";

const STORAGE_KEY = "spotnsort_user";

// Save user data (after login/register)
export function setCurrentUser(userData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

// Get current logged-in user
export function getCurrentUser() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

// Remove user (logout)
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

// ---- API Calls ----
// User login
export async function login(credentials) {
  try {
    const res = await api.post("/auth/login", credentials);
    if (res.data && res.data.user) {
      setCurrentUser(res.data.user);
    }
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
}

// User register
export async function register(userInfo) {
  try {
    const res = await api.post("/auth/register", userInfo);
    if (res.data && res.data.user) {
      setCurrentUser(res.data.user);
    }
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
}
