import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ManageReport: load selectedReportId from localStorage, show details,
 * allow authority to:
 * - set schedule (datetime-local) and estimated duration
 * - mark status (Pending, In Progress, Completed)
 * - upload completion photo (file or capture)
 * - save completion geo (uses geolocation)
 * - leave notes and award points
 *
 * Saves updates to localStorage under reports array.
 */

export default function ManageReport() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [report, setReport] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [estDuration, setEstDuration] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [completionPhoto, setCompletionPhoto] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [completionGeo, setCompletionGeo] = useState({ lat: null, lng: null });

  useEffect(() => {
    const cur = JSON.parse(localStorage.getItem("currentUser"));
    if (!cur || cur.role !== "authority") {
      navigate("/login");
      return;
    }

    const id = Number(localStorage.getItem("selectedReportId") || 0);
    const all = JSON.parse(localStorage.getItem("reports")) || [];
    setAllReports(all);
    const r = all.find((x) => x.id === id);
    if (!r) {
      alert("Selected report not found.");
      navigate("/authority/home");
      return;
    }
    setReport(r);
    setSchedule(r.schedule || "");
    setEstDuration(r.estDuration || "");
    setStatus(r.status || "Pending");
    setNotes(r.authorityNotes || "");
    setCompletionPhoto(r.completionPhoto || null);
    setCompletionGeo(r.completionGeo || { lat: r.completionLat || null, lng: r.completionLng || null });
  }, [navigate]);

  // Save changes to localStorage
  const save = () => {
    if (!report) return;
    const updated = allReports.map((x) => {
      if (x.id === report.id) {
        return {
          ...x,
          schedule,
          estDuration,
          status,
          authorityNotes: notes,
          completionPhoto,
          completionGeo,
          authorityId: JSON.parse(localStorage.getItem("currentUser")).email,
          updatedAt: new Date().toISOString(),
        };
      }
      return x;
    });
    localStorage.setItem("reports", JSON.stringify(updated));
    alert("Report updated.");
    navigate("/authority/home");
  };

  // file upload for completion photo
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCompletionPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  // camera functions
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
    setCompletionPhoto(data);
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

  // Save completion geo using browser geolocation
  const saveCompletionGeo = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not available.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCompletionGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        alert("Saved completion location.");
      },
      (err) => alert("Unable to fetch location: " + err.message),
      { timeout: 10000 }
    );
  };

  // award points to authority for this job (simple)
  const awardPoints = (pts) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;
    const allAuth = JSON.parse(localStorage.getItem("authorities")) || [];
    const idx = allAuth.findIndex(a => a.email === user.email);
    if (idx >= 0) {
      allAuth[idx].points = (allAuth[idx].points || 0) + pts;
      localStorage.setItem("authorities", JSON.stringify(allAuth));
    } else {
      // store minimal authority record
      const record = { email: user.email, name: user.name, points: pts };
      localStorage.setItem("authorities", JSON.stringify([...allAuth, record]));
    }
    alert(`${pts} points awarded to you.`);
  };

  if (!report) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Manage Report</h2>
            <div className="text-sm text-gray-600">{report.type} • {report.area} • reported {new Date(report.createdAt).toLocaleString()}</div>
          </div>
          <div>
            <button onClick={()=>navigate(-1)} className="px-3 py-1 border rounded">Back</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Original Report</h4>
            <img src={report.photo || "/placeholder-issue.png"} alt="original" className="w-full h-56 object-cover rounded border" />
            <p className="mt-2 text-sm text-gray-700">{report.description}</p>
            <p className="mt-2 text-xs text-gray-500">Report ID: {report.id}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Authority Actions</h4>

            <label className="block text-sm">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 border rounded mb-3">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <label className="block text-sm">Schedule (date & time)</label>
            <input type="datetime-local" value={schedule} onChange={e => setSchedule(e.target.value)} className="w-full p-2 border rounded mb-3" />

            <label className="block text-sm">Estimated duration (hours)</label>
            <input type="number" min="0" step="0.5" value={estDuration} onChange={e => setEstDuration(e.target.value)} className="w-full p-2 border rounded mb-3" />

            <label className="block text-sm">Authority Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 border rounded mb-3" rows="3"></textarea>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Completion Photo (upload or capture)</label>
              <div className="flex gap-2 items-center">
                <input type="file" accept="image/*" onChange={handleFile} />
                {!streaming ? (
                  <button onClick={startCamera} type="button" className="px-3 py-1 border rounded">Open Camera</button>
                ) : (
                  <>
                    <button onClick={capturePhoto} type="button" className="px-3 py-1 bg-blue-600 text-white rounded">Capture</button>
                    <button onClick={stopCamera} type="button" className="px-3 py-1 border rounded">Stop</button>
                  </>
                )}
              </div>
              <div className="mt-2">
                <video ref={videoRef} style={{display: streaming ? 'block' : 'none'}} className="w-full rounded border" />
                <canvas ref={canvasRef} style={{display: 'none'}} />
                {completionPhoto ? <img src={completionPhoto} alt="completion" className="w-full mt-2 rounded border" /> : <div className="w-full h-32 mt-2 rounded border flex items-center justify-center text-gray-400">No completion image</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1">Save completion geo (use device location)</label>
              <div className="flex gap-2 items-center">
                <button onClick={saveCompletionGeo} className="px-3 py-1 border rounded">Save Geo</button>
                <div className="text-sm text-gray-600">{completionGeo.lat ? `${completionGeo.lat.toFixed(5)}, ${completionGeo.lng.toFixed(5)}` : "No completion location"}</div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button onClick={() => {
                // quick save status + fields + award points when marking completed
                setReport((p)=>({...p}));
                if (status === "Completed") {
                  awardPoints(10);
                }
                // save to local storage by calling save()
                save();
              }} className="px-4 py-2 bg-green-600 text-white rounded">Save & Close</button>

              <button onClick={()=>{
                // cancel
                navigate("/authority/home");
              }} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
