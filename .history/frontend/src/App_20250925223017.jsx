// App.jsx
import ManageReport from "./pages/Authority/ManageReport";
import AuthorityAnalysis from "./pages/Authority/AuthorityAnalysis";
import AuthorityMap from "./pages/Authority/AuthorityMap";

// Inside <Routes>
<Route
  path="/authority/manage"
  element={
    <PrivateRoute role="authority">
      <ManageReport />
    </PrivateRoute>
  }
/>
<Route
  path="/authority/analysis"
  element={
    <PrivateRoute role="authority">
      <AuthorityAnalysis />
    </PrivateRoute>
  }
/>
<Route
  path="/authority/map"
  element={
    <PrivateRoute role="authority">
      <AuthorityMap />
    </PrivateRoute>
  }
/>
