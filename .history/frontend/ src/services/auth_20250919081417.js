import api from "./api";

export async function login(email, password, role) {
  // call backend login endpoint: POST /auth/login {email,password,role}
  const res = await api.post("/auth/login", { email, password, role });
  // expect { token, user }
  const { token, user } = res.data;
  localStorage.setItem("spotnsort_token", token);
  localStorage.setItem("spotnsort_user", JSON.stringify(user));
  return user;
}

export async function register(payload) {
  // payload for authority will include gov details and files; send FormData if needed
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export function logout() {
  localStorage.removeItem("spotnsort_token");
  localStorage.removeItem("spotnsort_user");
}

export function getCurrentUser() {
  const u = localStorage.getItem("spotnsort_user");
  return u ? JSON.parse(u) : null;
}
