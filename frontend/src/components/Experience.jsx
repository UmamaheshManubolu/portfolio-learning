// src/components/Experience.jsx
// Fetches experience data from FastAPI
// Falls back to static data if backend is offline

import { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/experience.js";

function Experience() {
  const [data, setData] = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("📡 Fetching Experience from FastAPI...");

    axios
      .get("http://localhost:8000/api/experience")
      .then((response) => {
        console.log("✅ Got experience data:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("❌ Error:", err.message);
        setError("Backend offline — showing static data");
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Work Experience</h2>

      {loading && <p style={styles.status}>⏳ Loading from FastAPI...</p>}
      {error   && <p style={styles.error}>⚠️ {error}</p>}
      {!loading && !error && (
        <p style={styles.success}>✅ Live data from FastAPI</p>
      )}

      {data.map((job) => (
        <div key={job.id} style={styles.card}>

          {/* Top row — role and type badge */}
          <div style={styles.topRow}>
            <span style={styles.role}>{job.role}</span>
            <span style={styles.typeBadge}>{job.type}</span>
          </div>

          {/* Company and period */}
          <p style={styles.company}>{job.company} · {job.location}</p>
          <p style={styles.period}>📅 {job.period}</p>

          {/* Bullet points */}
          <ul style={styles.list}>
            {job.highlights.map((point, index) => (
              <li key={index} style={styles.listItem}>
                {point}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div style={styles.tags}>
            {job.tech.map((t) => (
              <span key={t} style={styles.tag}>{t}</span>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

const styles = {
  container:  { maxWidth: "650px", margin: "40px auto", padding: "0 20px", fontFamily: "Arial" },
  heading:    { color: "#4f8ef7", borderBottom: "2px solid #4f8ef7", paddingBottom: "8px", marginBottom: "16px" },
  status:     { color: "#888", fontSize: "13px", marginBottom: "12px" },
  success:    { color: "#2e7d32", fontSize: "13px", background: "#e8f5e9", padding: "6px 12px", borderRadius: "6px", display: "inline-block", marginBottom: "16px" },
  error:      { color: "#c62828", fontSize: "13px", background: "#ffebee", padding: "6px 12px", borderRadius: "6px", marginBottom: "16px" },
  card:       { background: "white", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "20px", marginBottom: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  topRow:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" },
  role:       { fontSize: "18px", fontWeight: "bold", color: "#222" },
  typeBadge:  { fontSize: "11px", background: "#e3f2fd", color: "#1565c0", padding: "3px 10px", borderRadius: "10px" },
  company:    { color: "#4f8ef7", fontSize: "14px", fontWeight: "600", margin: "4px 0 2px" },
  period:     { color: "#888", fontSize: "13px", marginBottom: "14px" },
  list:       { paddingLeft: "18px", marginBottom: "14px" },
  listItem:   { color: "#444", fontSize: "14px", lineHeight: "1.8", marginBottom: "2px" },
  tags:       { display: "flex", flexWrap: "wrap", gap: "6px" },
  tag:        { background: "#ede7f6", color: "#512da8", padding: "3px 10px", borderRadius: "4px", fontSize: "12px" },
};

export default Experience;