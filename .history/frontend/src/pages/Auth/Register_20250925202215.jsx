// src/pages/Auth/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BubblesBackground from "../../components/BubblesBackground";
import { register } from "../../services/auth"; // updated service
import "../../styles/main.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleFromQuery = queryParams.get("role") || "user";

  const [role, setRole] = useState(roleFromQuery);

  // COMMON FIELDS
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // LOCATION
  const [locationVal, setLocationVal] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // AUTHORITY ONLY
  const [idNumber, setIdNumber] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [phone, setPhone] = useState("");
  const [workArea, setWorkArea] = useState(""); // where they operate
  const [problemsHandled, setProblemsHandled] = useState([]); // array of strings
  const [error, setError] = useState("");

  const problemOptions = [
    "Garbage",
    "Street Lights",
    "Water Leakage",
    "Trees",
    "Potholes",
    "Traffic Congestion",
    "Lack of Public Amenities",
  ];

  useEffect(() => {
    setRole(roleFromQuery);
  }, [roleFromQuery]);

  // CURRENT LOCATION
  useEffect(() => {
    if (useCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationVal(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        },
        (err) => {
          console.error(err);
          setError("Unable to fetch current location. Please enter manually.");
          setUseCurrentLocation(false);
        }
      );
    }
  }, [useCurrentLocation]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setIdFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (role === "authority") {
      if (!idNumber || !idFile || !phone || !workArea || problemsHandled.length === 0) {
        setError("Please fill all mandatory authority fields");
        return;
      }
    }

    try {
      await register({
        role,
        fullName,
        email,
        password,
        location: locationVal,
        idNumber,
        idFile,
        phone,
        workArea,
        problemsHandled,
      });

      // Navigate after successful registration
      if (role === "user") navigate("/user/home");
      else navigate("/authority/home");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="page-wrapper flex flex-col justify-center items-center min-h-screen text-white relative overflow-hidden">
      <BubblesBackground />

      {/* Back arrow */}
      <button
        className="absolute top-4 left-4 text-black text-2xl z-50"
        onClick={() => navigate("/")}
        title="Back to Landing Page"
      >
        ←
      </button>

      <div className="bg-black bg-opacity-90 p-8 rounded-lg shadow-lg w-96 flex flex-col items-center z-50">
        <h2 className="text-2xl font-bold mb-6">Register ({role})</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form
          className="w-full flex flex-col space-y-4"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          {/* LOCATION */}
          <div className="flex items-center justify-between w-full">
            <input
              type="text"
              placeholder="Location"
              className="flex-1 px-4 py-2 rounded bg-white text-black focus:outline-yellow-500 mr-2"
              value={locationVal}
              onChange={(e) => setLocationVal(e.target.value)}
              required={!useCurrentLocation}
              disabled={useCurrentLocation}
            />
            <label className="flex items-center text-white text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={useCurrentLocation}
                onChange={(e) => setUseCurrentLocation(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="ml-1">Use current location</span>
            </label>
          </div>

          {/* User/Authority common fields */}
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Authority fields */}
          {role === "authority" && (
            <>
              <input
                type="text"
                placeholder="Phone Number"
                className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="ID Number"
                className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />

              <div>
                <label className="block mb-1">Upload ID Card</label>
                <input type="file" accept="image/*,.pdf" onChange={handleFile} required />
              </div>

              <input
                type="text"
                placeholder="Work Area"
                className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
                value={workArea}
                onChange={(e) => setWorkArea(e.target.value)}
                required
              />

              <div>
                <label className="block mb-1">Problems You Handle</label>
                <div className="flex flex-wrap gap-2">
                  {problemOptions.map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() =>
                        setProblemsHandled((prev) =>
                          prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                        problemsHandled.includes(p)
                          ? "bg-yellow-400 text-black"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-white text-center">
          Already have an account?{" "}
          <span
            className="text-yellow-500 cursor-pointer hover:underline font-semibold"
            onClick={() => navigate(`/login?role=${role}`)}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
