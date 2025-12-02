import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/api";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F", "#845EC2"];

export default function UserAnalysis() {
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const resTrend = await api.get("/analysis/user/trends");
        setTrendData(resTrend.data);

        const resCategory = await api.get("/analysis/user/categories");
        setCategoryData(resCategory.data);

        const resRating = await api.get("/analysis/user/ratings");
        setRatingData(resRating.data);
      } catch (err) {
        console.error("Error fetching analysis:", err);
      }
    }
    fetchAnalysis();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Your Reports Analysis 📊</h1>

      {/* Line Chart: Issues over time */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Reports Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reports" stroke="#0088FE" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Category Distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Reports by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Authority Ratings */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Authority Ratings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="authority" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
