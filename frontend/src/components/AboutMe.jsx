// src/components/AboutMe.jsx
// Shows your profile — fetches live data from FastAPI backend

import React, { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/about_me.js";

function AboutMe() {
  const [data, setData]       = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/about")
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="about" style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 32px" }}>

      <p style={{ fontFamily: "monospace", color: "#63b3ed", fontSize: "13px", marginBottom: "6px" }}>
        // about_me
      </p>
      <h2 style={{ fontSize: "30px", fontWeight: "800", color: "#f7fafc", marginBottom: "6px" }}>
        About Me
      </h2>
      <div style={{ width: "48px", height: "3px", background: "linear-gradient(90deg,#63b3ed,#9f7aea)", borderRadius: "2px", marginBottom: "40px" }} />

      {!loading && !error && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          fontFamily: "monospace", fontSize: "11px", color: "#68d391",
          background: "rgba(104,211,145,0.07)",
          border: "1px solid rgba(104,211,145,0.2)",
          padding: "4px 12px", borderRadius: "20px", marginBottom: "32px",
        }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#68d391", display: "inline-block" }} />
          live · FastAPI
        </span>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "48px", alignItems: "start" }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "150px", height: "150px", borderRadius: "16px",
            background: "linear-gradient(135deg, #1a2438, #2d3748)",
            border: "2px solid rgba(99,179,237,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "36px", fontWeight: "900", color: "#63b3ed", fontFamily: "monospace",
          }}>
            UM
          </div>
          <div style={{
            fontSize: "12px", padding: "5px 14px", borderRadius: "20px",
            background: "rgba(104,211,145,0.08)", border: "1px solid rgba(104,211,145,0.25)",
            color: "#68d391", textAlign: "center", fontWeight: "600",
          }}>
            {data.available ? "Open to work" : "Not available"}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "26px", fontWeight: "700", color: "#f7fafc", marginBottom: "4px" }}>
            {data.name}
          </h3>
          <p style={{ fontSize: "15px", color: "#63b3ed", fontWeight: "600", marginBottom: "4px" }}>
            {data.title}
          </p>
          <p style={{ fontSize: "13px", color: "#a0aec0", marginBottom: "20px" }}>
            Germany
          </p>
          <p style={{
            fontSize: "15px", color: "#a0aec0", lineHeight: "1.9", marginBottom: "24px",
            borderLeft: "2px solid rgba(99,179,237,0.3)", paddingLeft: "16px",
          }}>
            {data.bio}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href={"mailto:" + data.email} style={{
              padding: "8px 18px", borderRadius: "8px",
              border: "1px solid rgba(99,179,237,0.2)",
              color: "#63b3ed", fontSize: "13px", fontWeight: "500",
            }}>
              Send Email
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" style={{
              padding: "8px 18px", borderRadius: "8px",
              background: "rgba(99,179,237,0.08)",
              border: "1px solid rgba(99,179,237,0.2)",
              color: "#63b3ed", fontSize: "13px", fontWeight: "500",
            }}>
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  ); 
}

export default AboutMe;