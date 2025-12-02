// src/pages/Auth/Register.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { register } from "../../services/auth"; // your existing register service
import { auth } from "../../firebase"; // Firebase config
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "../../styles/main.css";

const authorityRoles = [
  "Municipality Worker",
  "Sanitation Worker",
  "Traffic Authority",
  "Police",
  "Other",
];

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleFromQuery = queryParams.get("role") || "user";

  const [role, setRole] = useState(roleFromQuery);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [locationVal, setLocationVal] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [authorityRole, setAuthorityRole] = useState("");
  const [error, setError] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    setRole(roleFromQuery);
  }, [roleFromQuery]);

  // Current location
  useEffect(() => {
    if (useCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocationVal(
            `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`
          );
        },
        () => {
          setError("Unable to fetch current location. Enter manually.");
          setUseCurrentLocation(false);
        }
      );
    }
  }, [useCurrentLocation]);

  // Phone verification
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
  };

  const sendOtp = async () => {
    setError("");
    // Validate phone
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }
    const phoneNumber = `+91${cleaned}`;
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      alert("✅ OTP sent! Enter the OTP to verify your phone.");
    } catch (err) {
      console.error(err);
      setError("Phone verification failed. Make sure number is correct.");
    }
  };

  const verifyOtp = async () => {
    const otp = prompt("Enter the OTP sent to your phone:");
    if (!otp) return;
    try {
      await window.confirmationResult.confirm(otp);
      setPhoneVerified(true);
      alert("✅ Phone number verified successfully!");
    } catch (err) {
      console.error(err);
      setError("OTP verification failed");
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setIdFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phoneVerified) {
      setError("Please verify your phone number before registering");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (role === "authority") {
      if (!idNumber && !idFile) {
        setError("Provide either ID Number or upload ID card.");
        return;
      }
      if (!authorityRole) {
        setError("Select your authority role.");
        return;
      }
    }

    try {
      await register({
        role,
        fullName,
        email,
        phone: `+91${phone.replace(/\D/g, "")}`,
        password,
        location: locationVal,
        idNumber,
        idFile,
        authorityRole,
      });

      if (role === "user") navigate("/user/home");
      else navigate("/authority/home");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="page-wrapper flex flex-col justify-center items-center min-h-screen text-white relative overflow-hidden">
      <button
        className="absolute top-4 left-4 text-black text-2xl z-50"
        onClick={() => navigate("/")}
        title="Back to Landing Page"
      >
        ←
      </button>

      <div className="bg-black bg-opacity-90 p-8 rounded-lg shadow-lg w-96 flex flex-col items-center z-50">
        <h2 className="text-2xl font-bold mb-6">
          Register ({role === "user" ? "User" : "Authority"})
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form
          className="w-full flex flex-col space-y-4"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
          />

          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="Phone (10 digits)"
              className="flex-1 px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              required
              autoComplete="tel"
            />
            {!phoneVerified ? (
              <button
                type="button"
                onClick={sendOtp}
                className="px-3 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-3 py-2 bg-gray-400 text-black rounded cursor-not-allowed"
              >
                Verified
              </button>
            )}
            {otpSent && !phoneVerified && (
              <button
                type="button"
                onClick={verifyOtp}
                className="px-3 py-2 bg-indigo-500 text-black rounded hover:bg-indigo-600 transition"
              >
                Verify OTP
              </button>
            )}
          </div>

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          {/* Location */}
          <div className="flex items-center justify-between w-full">
            <input
              type="text"
              placeholder="Location"
              className="flex-1 px-4 py-2 rounded bg-white text-black focus:outline-yellow-500 mr-2"
              value={locationVal}
              onChange={(e) => setLocationVal(e.target.value)}
              required={!useCurrentLocation}
              disabled={useCurrentLocation}
              autoComplete="street-address"
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

          {/* Authority-only fields */}
          {role === "authority" && (
            <>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="ID Number (Government Issued)"
                  className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload ID Card
                  </button>
                  {idFile && <span className="text-sm">{idFile.name}</span>}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFile}
                  />
                </div>
              </div>

              <select
                value={authorityRole}
                onChange={(e) => setAuthorityRole(e.target.value)}
                className="px-4 py-2 rounded bg-white text-black focus:outline-yellow-500"
                required
              >
                <option value="">-- Select Authority Role --</option>
                {authorityRoles.map((r, idx) => (
                  <option key={idx} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </>
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition mt-2"
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

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Register;
