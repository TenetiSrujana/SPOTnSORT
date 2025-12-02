// src/pages/User/UserRewards.jsx
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";

export default function UserRewards() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const allReports = JSON.parse(localStorage.getItem("reports")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const userReports = allReports.filter((r) => r.userEmail === currentUser.email);

    // Calculate points
    const totalPoints = userReports.reduce((acc, r) => {
      let p = 10; // base 10 points per report
      if (r.priority === "High") p += 5;
      if (r.status === "Resolved") p += 5; // bonus for resolved
      return acc + p;
    }, 0);
    setPoints(totalPoints);

    // Determine badges
    const earnedBadges = [];
    if (userReports.length >= 1) earnedBadges.push({ title: "First Report Submitted", description: "Congrats! You submitted your first issue.", color: "bg-yellow-400" });
    if (userReports.length >= 10) earnedBadges.push({ title: "10 Reports Completed", description: "You are helping your community stay clean and safe!", color: "bg-indigo-500" });
    if (userReports.some((r) => r.status === "Resolved")) earnedBadges.push({ title: "Resolved Hero", description: "Your report helped resolve a local issue!", color: "bg-green-500" });

    setBadges(earnedBadges);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-y-auto scroll-smooth">
      {/* Bubble background */}
      <BubblesBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 backdrop-blur-sm shadow-md">
        <nav className="flex items-center px-8 py-4">
          <FaArrowLeft
            className="text-yellow-400 text-2xl mr-4 cursor-pointer hover:scale-110 transition"
            onClick={() => navigate("/user/home")}
          />
          <h1 className="text-3xl font-extrabold text-yellow-400">Rewards & Achievements</h1>
        </nav>
      </header>

      <div className="relative z-10 p-6 pt-28 space-y-6">
        {/* Points Section */}
        <div className="rounded-2xl shadow-md bg-black bg-opacity-50 p-6 text-center">
          <h2 className="text-xl font-semibold mb-2 text-yellow-400">Your Points</h2>
          <div className="text-4xl font-bold text-yellow-400">{points}</div>
          <p className="mt-2 text-gray-300">Earn points by submitting reports. Higher priority issues and resolved reports earn bonus points!</p>
        </div>

        {/* Badges / Achievements */}
        <div className="rounded-2xl shadow-md bg-black bg-opacity-50 p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">Your Badges</h2>
          {badges.length === 0 ? (
            <p className="text-gray-400">Submit your first report to start earning badges!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge, idx) => (
                <div key={idx} className={`p-4 rounded-xl shadow-md hover:shadow-lg transition ${badge.color} bg-opacity-70`}>
                  <h3 className="text-lg font-bold text-black">{badge.title}</h3>
                  <p className="mt-1 text-sm text-black">{badge.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How Rewards Work */}
        <div className="rounded-2xl shadow-md bg-black bg-opacity-50 p-6 space-y-2">
          <h2 className="text-xl font-semibold mb-2 text-yellow-400">How Rewards Work</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Submit a report → earn base points.</li>
            <li>High-priority issues → extra points.</li>
            <li>When your report is resolved → bonus points.</li>
            <li>Earn badges for milestones like first report, 10 reports, or resolved issues.</li>
            <li>Check this page regularly to see your points and new achievements!</li>
          </ul>
          <p className="mt-2 text-gray-300 italic">Your contributions help make your locality cleaner and safer!</p>
        </div>
      </div>
    </div>
  );
}
