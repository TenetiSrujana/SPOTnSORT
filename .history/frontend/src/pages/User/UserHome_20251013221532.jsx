import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  FaCamera,
  FaPaperPlane,
  FaUserCheck,
  FaCheckCircle,
  FaLightbulb,
  FaCity,
} from "react-icons/fa";
import "../../styles/main.css";
import beforeImg from "../../assets/before.png";
import afterImg from "../../assets/after.png";

const reportData = [
  { name: "Jan", Reports: 5, Resolved: 2 },
  { name: "Feb", Reports: 8, Resolved: 6 },
  { name: "Mar", Reports: 12, Resolved: 10 },
  { name: "Apr", Reports: 7, Resolved: 5 },
  { name: "May", Reports: 15, Resolved: 12 },
];

const categoryData = [
  { category: "Potholes", count: 12 },
  { category: "Garbage", count: 20 },
  { category: "Streetlights", count: 8 },
  { category: "Water Leakage", count: 6 },
];

const UserHome = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const scrollToTop = () => {
    heroRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative text-white overflow-y-auto scroll-smooth min-h-screen bg-[url('/bg-home.jpg')] bg-cover bg-center">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
          <h1
            className="text-3xl font-extrabold text-yellow-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={scrollToTop}
          >
            SpotnSort
          </h1>
          <ul className="flex space-x-6 font-semibold text-white">
            {["Home", "Report", "Map", "Analyzer", "Rewards"].map((item, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:text-yellow-400 hover:scale-105 transition"
                onClick={() => {
                  switch (item) {
                    case "Home":
                      scrollToTop();
                      break;
                    case "Report":
                      navigate("/user/report");
                      break;
                    case "Map":
                      navigate("/user/map");
                      break;
                    case "Analyzer":
                      navigate("/user/analysis");
                      break;
                    case "Rewards":
                      navigate("/user/rewards");
                      break;
                    default:
                      break;
                  }
                }}
              >
                {item}
              </li>
            ))}
            <li
              className="px-4 py-2 cursor-pointer text-red-400 hover:text-red-500 hover:scale-105 transition"
              onClick={() => navigate("/")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-24"
      >
        <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Spot the Problem, <span className="text-yellow-400">Sort the City</span>
        </h2>
        <p className="text-lg max-w-3xl mb-8 drop-shadow-md">
          <span className="text-yellow-400">SpotnSort</span> is your{" "}
          <strong>Smart Civic Issue Reporting & Tracking Platform</strong>. Identify civic problems,
          report them instantly, and watch your city transform.
        </p>
        <button
          onClick={() => navigate("/user/report")}
          className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full shadow-lg hover:bg-yellow-400 hover:text-black hover:scale-105 transition"
        >
          Report an Issue
        </button>
      </section>

      {/* How It Works */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-28 space-y-12">
        <h3 className="text-4xl font-bold text-yellow-400">How SpotnSort Works</h3>
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaCamera />,
              title: "Spot the Issue",
              text: "Identify a civic problem like potholes, broken lights, garbage, etc., and capture a photo.",
            },
            {
              icon: <FaPaperPlane />,
              title: "Report Instantly",
              text: "Submit details including location, category, and description using SpotnSort.",
            },
            {
              icon: <FaUserCheck />,
              title: "Authority Verification",
              text: "Authorities receive notifications, verify the issue, and take action quickly.",
            },
            {
              icon: <FaCheckCircle />,
              title: "Track & Resolve",
              text: "Watch the issue resolution on your dashboard with real-time updates and analytics.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <div className="text-yellow-400 text-4xl mb-4">{step.icon}</div>
              <h4 className="text-2xl font-semibold mb-2 text-yellow-400">{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact & Recent Reports */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-28 space-y-12">
        <h3 className="text-4xl font-bold text-yellow-400">Impact & Recent Reports</h3>
        <div className="flex flex-col md:flex-row md:space-x-10 space-y-8 md:space-y-0 max-w-6xl mx-auto">
          {[ 
            { title: "Before SpotnSort", text: "Potholes, garbage, broken infrastructure remained unnoticed. Citizens frustrated.", img: beforeImg },
            { title: "After SpotnSort", text: "Instant reporting, quick action, clean & smart cities with citizen engagement.", img: afterImg }
          ].map((card, i) => (
            <div key={i} className="flex-1 p-6 bg-black bg-opacity-50 rounded-xl shadow-lg">
              <h4 className="text-2xl font-semibold mb-3 text-yellow-400">{card.title}</h4>
              <p>{card.text}</p>
              <img
                src={card.img}
                alt={card.title}
                className="mt-4 rounded-lg shadow-md w-48 h-48 object-cover mx-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Analytics Graphs */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-28 space-y-12 bg-black bg-opacity-40 backdrop-blur-sm">
        <h3 className="text-4xl font-bold text-yellow-400">Analytics & Trends</h3>
        <div className="w-full max-w-4xl h-80 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#FFD700" />
              <YAxis stroke="#FFD700" />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #FFD700" }} />
              <CartesianGrid stroke="#444" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="Reports" stroke="#FFD700" strokeWidth={2} />
              <Line type="monotone" dataKey="Resolved" stroke="#00FFAA" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full max-w-4xl h-80 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="category" stroke="#FFD700" />
              <YAxis stroke="#FFD700" />
              <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #FFD700" }} />
              <Legend wrapperStyle={{ color: "#FFD700" }} />
              <Bar dataKey="count" fill="#FFD700" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Tips & Benefits */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-28 space-y-12">
        <h3 className="text-4xl font-bold text-yellow-400">Why Use SpotnSort?</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaLightbulb />,
              title: "Be Informed",
              text: "Get real-time updates about civic issues in your area.",
            },
            {
              icon: <FaCity />,
              title: "Engage with City",
              text: "Participate actively in improving your city’s infrastructure.",
            },
            {
              icon: <FaCheckCircle />,
              title: "Track Progress",
              text: "See how reported issues get resolved with transparency.",
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-black bg-opacity-50 p-6 rounded-xl shadow-lg hover:scale-105 transition"
            >
              <div className="text-yellow-400 text-4xl mb-4">{tip.icon}</div>
              <h4 className="text-2xl font-semibold mb-2 text-yellow-400">{tip.title}</h4>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-80 text-center py-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} SpotnSort. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserHome;
