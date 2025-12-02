import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthorityAnalysis = () => {
  const navigate = useNavigate();
  // Removed 'reports' as it was unused
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/authority/reports").then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1>Authority Reports Analysis</h1>
      <p>Total reports fetched: {data.length}</p>
    </div>
  );
};

export default AuthorityAnalysis;
