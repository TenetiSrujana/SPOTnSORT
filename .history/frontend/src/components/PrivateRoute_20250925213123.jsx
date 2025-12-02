const PrivateRoute = ({ children, role }) => {
  const user = getCurrentUser();

  // TEMPORARY DEV FIX: auto-login authority
  if (!user) {
    localStorage.setItem(
      "spotnsort_current_user",
      JSON.stringify({ email: "admin@test.com", role: "authority" })
    );
  }

  return children;
};
