// src/components/PrivateRoute.jsx
const user = getCurrentUser();

if (!user || user.role !== role) {
  return <Navigate to="/login" replace />;
}

