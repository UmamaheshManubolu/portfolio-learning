// Shows my profile picture and a short bio about me. This is the first section of the website.
// The data is fetched from the backend API, but if the API call fails for some reason (e.g. backend server is down), it falls back to static data defined in src/data/about_me.js.

import { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/about_me.js";

function AboutMe() {
    const [data, setData] = useState(staticData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching about me from FastAPI...");

        axios.get("http://localhost:8000/api/about")
            .then((response) => {
                console.log("Successfully fetched about me from FastAPI!:", response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching about me from FastAPI:", error.message);
                setError("Failed to load data from API (Backend offline) - showing static fallback data.");
                setLoading(false);
            });
        }, []);

        return (
        <div style={styles.container}>
            <h2 style={styles.heading}>About Me</h2>

            {loading && <p style={styles.status}> Loading from FastAPI...</p>}
            {error   && <p style={styles.error}> {error}</p>}
            {!loading && !error && (
                <p style={styles.success}> Live data from FastAPI</p>
            )}

            <p style={styles.name}>{data.name}</p>
            <p style={styles.title}>{data.title}</p>
            <p style={styles.location}> {data.location}</p>
            <p style={styles.bio}>{data.bio}</p>

            <div style={styles.links}>
                <a href={`mailto:${data.email}`} style={styles.link}>
                    {data.email}
                </a>
                <a href={data.linkedin} target="_blank" rel="noreferrer" style={styles.link}>
                    LinkedIn
                </a>
            </div>

            {data.available && (
                <div style={styles.badge}> Open to opportunities</div>

      )}
    </div>
  );

}

const styles = {
  container: {
    maxWidth: "650px", margin: "40px auto", padding: "28px",
    border: "1px solid #ddd", borderRadius: "12px",
    fontFamily: "Arial", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    background: "white"
  },
  heading:  { color: "#4f8ef7", borderBottom: "2px solid #4f8ef7", paddingBottom: "8px", marginBottom: "16px" },
  status:   { color: "#888", fontSize: "13px" },
  success:  { color: "#2e7d32", fontSize: "13px", background: "#e8f5e9", padding: "6px 12px", borderRadius: "6px", display: "inline-block", marginBottom: "16px" },
  error:    { color: "#c62828", fontSize: "13px", background: "#ffebee", padding: "6px 12px", borderRadius: "6px", marginBottom: "16px" },
  name:     { fontSize: "26px", fontWeight: "bold", margin: "8px 0 4px" },
  title:    { fontSize: "16px", color: "#555", margin: "4px 0" },
  location: { fontSize: "14px", color: "#888", margin: "4px 0 16px" },
  bio:      { lineHeight: "1.8", color: "#333", marginBottom: "20px" },
  links:    { display: "flex", gap: "20px", marginBottom: "16px", flexWrap: "wrap" },
  link:     { color: "#4f8ef7", textDecoration: "none", fontSize: "14px" },
  badge:    { display: "inline-block", background: "#e8f5e9", color: "#2e7d32", padding: "6px 16px", borderRadius: "20px", fontSize: "14px" },
};

export default AboutMe;