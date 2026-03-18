// src/components/Experience.jsx
// Fetches experience data from FastAPI
// Falls back to static data if backend is offline

import React, { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/experience.js";

function Experience() {
  const [data, setData]       = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/experience`)
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="experience" style={{ background: "#0d1321", padding: "80px 32px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <p style={{ fontFamily: "monospace", color: "#63b3ed", fontSize: "13px", marginBottom: "6px" }}>
          // work_history
        </p>
        <h2 style={{ fontSize: "30px", fontWeight: "800", color: "#f7fafc", marginBottom: "6px" }}>
          Work Experience
        </h2>
        <div style={{ width: "48px", height: "3px", background: "linear-gradient(90deg,#63b3ed,#9f7aea)", borderRadius: "2px", marginBottom: "40px" }} />

        {!loading && !error && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            fontFamily: "monospace", fontSize: "11px", color: "#68d391",
            background: "rgba(104,211,145,0.07)", border: "1px solid rgba(104,211,145,0.2)",
            padding: "4px 12px", borderRadius: "20px", marginBottom: "32px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#68d391", display: "inline-block" }} />
            live · FastAPI
          </span>
        )}

        {data.map((job, i) => (
          <div key={job.id} style={{ display: "flex", gap: "20px", marginBottom: "8px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
              <div style={{
                width: "13px", height: "13px", borderRadius: "50%", flexShrink: 0,
                background: "#63b3ed", boxShadow: "0 0 14px rgba(99,179,237,0.6)",
                border: "3px solid #0b0f1a",
              }} />
              {i < data.length - 1 && (
                <div style={{ width: "2px", flex: 1, background: "rgba(99,179,237,0.12)", margin: "8px 0", minHeight: "50px" }} />
              )}
            </div>

            <div
              style={{
                flex: 1, background: "#111827",
                border: "1px solid rgba(99,179,237,0.1)",
                borderRadius: "14px", padding: "24px", marginBottom: "20px",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,179,237,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(99,179,237,0.1)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#f7fafc", marginBottom: "4px" }}>
                    {job.role}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#63b3ed", fontWeight: "500" }}>
                    {job.company} · {job.location}
                  </p>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#a0aec0" }}>
                    {job.period}
                  </span>
                  <span style={{
                    fontSize: "11px", background: "rgba(159,122,234,0.1)", color: "#9f7aea",
                    padding: "3px 10px", borderRadius: "20px", border: "1px solid rgba(159,122,234,0.2)",
                  }}>
                    {job.type}
                  </span>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
                {job.highlights.map((point, idx) => (
                  <li key={idx} style={{ fontSize: "14px", color: "#a0aec0", lineHeight: "1.8", marginBottom: "4px", paddingLeft: "18px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#63b3ed" }}>▸</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {job.tech.map((t) => (
                  <span key={t} style={{
                    padding: "3px 12px", borderRadius: "20px", fontSize: "12px", fontFamily: "monospace",
                    background: "rgba(99,179,237,0.08)", color: "#63b3ed", border: "1px solid rgba(99,179,237,0.15)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
