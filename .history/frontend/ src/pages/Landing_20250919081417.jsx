import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing(){
  const nav = useNavigate();
  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-md-8 text-center card p-4 shadow-sm">
        <img src="/assets/logo.png" alt="SpotnSort" style={{width:140, marginBottom:12}} />
        <h3>SpotnSort</h3>
        <p className="text-muted">Citizen-powered civic reporting</p>

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-lg btn-outline-primary" onClick={()=>nav("/login?role=user")}>I'm a User</button>
          <button className="btn btn-lg btn-primary" onClick={()=>nav("/login?role=authority")}>I'm Authority</button>
        </div>

        <hr />

        <p className="small text-muted">
          Use the buttons above to login as a citizen reporter or as an authority officer.
        </p>
      </div>
    </div>
  );
}
