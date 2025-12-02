// src/services/auth.js

const STORAGE_KEY = "spotnsort_users"; // all registered users
const CURRENT_USER = "spotnsort_current_user";

// Save current logged-in user
export function setCurrentUser(userData) {
  localStorage.setItem(CURRENT_USER, JSON.stringify(userData));
}

// Get current logged-in user
export function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

// Remove user (logout)
export function logout() {
  localStorage.removeItem(CURRENT_USER);
}

// ---- Simulate Registration ----
export async function register(userInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const exists = users.find(u => u.email === userInfo.email && u.role === userInfo.role);
      if (exists) {
        reject({ message: "User already exists" });
      } else {
        users.push(userInfo);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        setCurrentUser(userInfo);
        resolve({ user: userInfo });
      }
    }, 700); // simulate network delay
  });
}

// ---- Simulate Login ----
export async function login(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const user = users.find(
        u =>
          u.email === credentials.email &&
          u.password === credentials.password &&
          u.role === credentials.role
      );
      if (user) {
        setCurrentUser(user);
        resolve({ user });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, 700); // simulate network delay
  });
}
