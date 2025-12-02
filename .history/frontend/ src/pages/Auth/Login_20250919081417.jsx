import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../services/auth";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [q] = useSearchParams();
  const nav = useNavigate();

  useEffect(()=> {
    const r = q.get("role");
    if (r) setRole(r);
  },[q]);

  async function submit(e){
    e.preventDefault();
    try{
      const user = await login(email, password, role);
      if (user.role === "authority") nav("/authority/home");
      else nav("/user/home");
    }catch(err){
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 card p-4">
        <h4>Login — {role}</h4>
        <form onSubmit={submit}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select value={role} onChange={e=>setRole(e.target.value)} className="form-select">
              <option value="user">User</option>
              <option value="authority">Authority</option>
            </select>
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
