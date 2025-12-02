import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReportForm() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [user, setUser] = useState(null);
  const [type, setType] = useState("Pothole");
  const [severity, setSeverity] = useState("Medium");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    const cur = JSON.parse(localStorage.getItem("currentUser"));
    if (!cur) {
      navigate("/login");
      return;
    }
    setUser(cur);
    setName(cur.name || "");
    setPhone(cur.phone || "");
  }, [navigate]);

  // Get browser location
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => {
        alert("Unable to fetch location: " + err.message);
      },
      { timeout: 10000 }
    );
  };

  // File upload handler (read as dataURL)
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoData(reader.result);
    reader.readAsDataURL(file);
  };

  // Camera functions
  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera not supported.");
      return;
    }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = s;
      videoRef.current.play();
      setStreaming(true);
    } catch (err) {
      alert("Could not access camera: " + err.message);
    }
  };

  const capturePhoto = () => {
    if (!streaming) return;
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    const data = canvasRef.current.toDataURL("image/jpeg", 0.9);
    setPhotoData(data);
    // stop stream tracks
    const tracks = videoRef.current.srcObject?.getTracks() || [];
    tracks.forEach((t) => t.stop());
    videoRef.current.srcObject = null;
    setStreaming(false);
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  };

  // Submit
  const submit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please provide a title and description.");
      return;
    }

    const allReports = JSON.parse(localStorage.getItem("reports")) || [];
    const newReport = {
      id: Date.now(),
      userEmail: user.email,
      type,
      severity,
      title,
      description,
      name,
      phone,
      area,
      lat,
      lng,
      photo: photoData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    allReports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(allReports));
    alert("Report submitted. Authorities will be notified (simulated).");
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Report an issue</h2>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded">
              <option>Pothole</option>
              <option>Broken Streetlight</option>
              <option>Water Leak</option>
              <option>Garbage Overflow</option>
              <option>Other</option>
            </select>

            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="p-2 border rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <input className="w-full p-2 border rounded" placeholder="Short title (e.g., Huge pothole on Main st.)" value={title} onChange={(e)=>setTitle(e.target.value)} />

          <textarea className="w-full p-2 border rounded" rows="4" placeholder="Describe the problem and how it affects people" value={description} onChange={(e)=>setDescription(e.target.value)} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="p-2 border rounded" placeholder="Your name (optional)" value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="p-2 border rounded" placeholder="Phone (optional)" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </div>

          <input className="w-full p-2 border rounded" placeholder="Area / Locality (e.g., Kukatpally)" value={area} onChange={(e)=>setArea(e.target.value)} />

          <div className="flex gap-3 items-center">
            <button type="button" onClick={useCurrentLocation} className="px-3 py-2 border rounded">Use current location</button>
            <div className="text-sm text-gray-600">
              {lat && lng ? `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}` : "No location selected"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photo (upload or capture)</label>
            <div className="flex gap-3">
              <input type="file" accept="image/*" onChange={handleFile} className="border p-2 rounded" />
              {!streaming ? (
                <button type="button" onClick={startCamera} className="px-3 py-2 border rounded">Open camera</button>
              ) : (
                <button type="button" onClick={capturePhoto} className="px-3 py-2 bg-blue-600 text-white rounded">Capture</button>
              )}
              {streaming && <button type="button" onClick={stopCamera} className="px-3 py-2 border rounded">Stop</button>}
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              <div>
                <video ref={videoRef} className="w-full rounded border" style={{display: streaming ? 'block' : 'none'}} />
                <canvas ref={canvasRef} style={{display: 'none'}} />
              </div>

              <div>
                {photoData ? (
                  <img src={photoData} alt="preview" className="rounded w-full object-cover border" />
                ) : (
                  <div className="w-full h-40 rounded border flex items-center justify-center text-gray-400">No photo yet</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  );
}
