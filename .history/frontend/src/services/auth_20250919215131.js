import axios from "axios";
import { BASE_URL } from "../config";

// Helper for login
export const login = async ({ email, password, role }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password, role });
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Invalid email, password, or role");
  }
};

// Helper for register
export const register = async ({ name, email, password, role }) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, { name, email, password, role });
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};