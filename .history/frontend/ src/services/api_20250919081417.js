import axios from "axios";
import { API_CONFIG } from "../config";

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

// attach auth token if stored
api.interceptors.request.use(cfg => {
  const t = localStorage.getItem("spotnsort_token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default api;
