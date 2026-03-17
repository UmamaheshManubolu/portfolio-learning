import React, { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/projects.js";

const CATEGORIES = ["All", "AI Research", "Computer Vision", "Robotics", "Backend"];

function Projects() {
  const [data, setData]         = useState(staticData);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [active, setActive]     = useState("All");

  useEffect(() => {
    axios.get("http://localhost:8000/api/projects")
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const filtered = active === "All" ? data : data.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ background: "#0d1321", padding: "80px 32px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        <p style={{ fontFamily: "monospace", color: "#63b3ed", fontSize: "13px", marginBottom: "6px" }}>
          // my_work
        </p>
        <h2 style={{ fontSize: "30px", fontWeight: "800", color: "#f7fafc", marginBottom: "6px" }}>
          Projects
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

        {error && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            fontFamily: "monospace", fontSize: "11px", color: "#fc8181",
            background: "rgba(252,129,129,0.07)", border: "1px solid rgba(252,129,129,0.2)",
            padding: "4px 12px", borderRadius: "20px", marginBottom: "32px",
          }}>
            static data · backend offline
          </span>
        )}

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "36px" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 18px", borderRadius: "20px",
                fontSize: "13px", fontWeight: "500",
                cursor: "pointer", border: "1px solid",
                transition: "all 0.2s",
                background: active === cat ? "rgba(99,179,237,0.15)" : "transparent",
                borderColor: active === cat ? "#63b3ed" : "rgba(99,179,237,0.2)",
                color: active === cat ? "#63b3ed" : "#a0aec0",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {filtered.map((project) => (
            <div
              key={project.id}
              style={{
                background: "#111827",
                border: "1px solid rgba(99,179,237,0.1)",
                borderRadius: "14px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transition: "border-color 0.25s, transform 0.25s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,179,237,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Featured badge */}
              {project.featured && (
                <span style={{
                  position: "absolute", top: "16px", right: "16px",
                  fontSize: "10px", padding: "2px 8px", borderRadius: "10px",
                  background: "rgba(255,193,7,0.1)", color: "#ffc107",
                  border: "1px solid rgba(255,193,7,0.25)", fontWeight: "600",
                }}>
                  Featured
                </span>
              )}

              {/* Category */}
              <span style={{
                fontSize: "11px", color: "#63b3ed",
                fontFamily: "monospace", textTransform: "uppercase",
                letterSpacing: "1px",
              }}>
                {project.category}
              </span>

              {/* Title */}
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#f7fafc", lineHeight: "1.4" }}>
                {project.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: "13px", color: "#a0aec0", lineHeight: "1.7", flex: 1 }}>
                {project.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.tech.map((t) => (
                  <span key={t} style={{
                    padding: "2px 10px", borderRadius: "20px",
                    fontSize: "11px", fontFamily: "monospace",
                    background: "rgba(99,179,237,0.07)", color: "#63b3ed",
                    border: "1px solid rgba(99,179,237,0.12)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: "flex", gap: "12px", paddingTop: "8px", borderTop: "1px solid rgba(99,179,237,0.08)" }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" style={{
                    fontSize: "13px", color: "#a0aec0",
                    display: "flex", alignItems: "center", gap: "4px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#63b3ed"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#a0aec0"; }}
                  >
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" style={{
                    fontSize: "13px", color: "#a0aec0",
                    display: "flex", alignItems: "center", gap: "4px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#68d391"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#a0aec0"; }}
                  >
                    Live Demo
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;
