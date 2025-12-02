// src/services/auth.js

const STORAGE_KEY = "spotnsort_users";        // all registered users
const CURRENT_USER = "spotnsort_current_user"; // currently logged-in user

// Save current logged-in user
export function setCurrentUser(userData) {
  localStorage.setItem(CURRENT_USER, JSON.stringify(userData));
}

// Get current logged-in user
export function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

// Remove current user (logout)
export function logout() {
  localStorage.removeItem(CURRENT_USER);
}

// ---- Simulate Registration ----
export async function register(userInfo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      // Check if user with same email and role already exists
      const exists = users.find(
        u => u.email.toLowerCase() === userInfo.email.toLowerCase() && u.role === userInfo.role
      );

      if (exists) {
        reject({ message: "User already exists" });
      } else {
        // Add new user
        const newUser = { ...userInfo };
        users.push(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        // Set as current logged-in user
        setCurrentUser(newUser);

        resolve({ user: newUser });
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
          u.email.toLowerCase() === credentials.email.toLowerCase() &&
          u.password === credentials.password &&
          u.role === credentials.role
      );

      if (user) {
        setCurrentUser(user); // Save current user
        resolve({ user });
      } else {
        reject({ message: "Invalid email, password, or role" });
      }
    }, 700); // simulate network delay
  });
}
