import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [role, setRole] = useState("user");
  const [payload, setPayload] = useState({ name:"", email:"", password:"", phone:"", location:"" });
  const [govFile, setGovFile] = useState(null);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      if(role === "authority"){
        const fd = new FormData();
        fd.append("role","authority");
        Object.entries(payload).forEach(([k,v])=>fd.append(k,v));
        if (govFile) fd.append("gov_proof", govFile);
        await api.post("/auth/register", fd, { headers: { "Content-Type":"multipart/form-data" }});
      } else {
        await api.post("/auth/register", {...payload, role});
      }
      alert("Registration successful. Please login.");
      nav("/login");
    }catch(err){
      alert(err.response?.data?.message || "Register failed");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 card p-4">
        <h4>Register</h4>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="authority">Authority</option>
          </select>
        </div>

        <form onSubmit={submit}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input className="form-control" placeholder="Full name" value={payload.name} onChange={e=>setPayload({...payload, name:e.target.value})}/>
            </div>
            <div className="col-md-6 mb-2">
              <input className="form-control" placeholder="Email" value={payload.email} onChange={e=>setPayload({...payload, email:e.target.value})}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <input className="form-control" placeholder="Phone" value={payload.phone} onChange={e=>setPayload({...payload, phone:e.target.value})}/>
            </div>
            <div className="col-md-6 mb-2">
              <input className="form-control" placeholder="Location (City / Area)" value={payload.location} onChange={e=>setPayload({...payload, location:e.target.value})}/>
            </div>
          </div>

          <div className="mb-2">
            <input type="password" className="form-control" placeholder="Password" value={payload.password} onChange={e=>setPayload({...payload, password:e.target.value})}/>
          </div>

          {role==="authority" && (
            <>
              <div className="mb-2">
                <label>Gov issued details (e.g., ID number)</label>
                <input className="form-control" placeholder="Gov ID" onChange={e=>setPayload({...payload, gov_id:e.target.value})}/>
              </div>
              <div className="mb-3">
                <label>Upload proof (gov ID scan) </label>
                <input type="file" className="form-control" onChange={e=>setGovFile(e.target.files[0])} />
              </div>
            </>
          )}

          <button className="btn btn-primary">Create Account</button>
        </form>
      </div>
    </div>
  );
}
