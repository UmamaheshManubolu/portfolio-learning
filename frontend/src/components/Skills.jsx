import React, { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/skills.js";

function Skills() {
  const [data, setData]       = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/skills`)
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section
      id="skills"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "100px 32px",
      }}
    >
      <p style={{
        fontFamily: "monospace",
        color: "#63b3ed",
        fontSize: "13px",
        marginBottom: "6px",
      }}>
        // tech_stack
      </p>

      <h2 style={{
        fontSize: "30px",
        fontWeight: "800",
        color: "#f7fafc",
        marginBottom: "6px",
      }}>
        Skills
      </h2>

      <div style={{
        width: "48px", height: "3px",
        background: "linear-gradient(90deg, #63b3ed, #9f7aea)",
        borderRadius: "2px",
        marginBottom: "44px",
      }} />

      {!loading && !error && (
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#68d391",
          background: "rgba(104,211,145,0.07)",
          border: "1px solid rgba(104,211,145,0.2)",
          padding: "4px 12px",
          borderRadius: "20px",
          marginBottom: "36px",
        }}>
          <span style={{
            width: "6px", height: "6px",
            borderRadius: "50%",
            background: "#68d391",
            display: "inline-block",
            boxShadow: "0 0 6px #68d391",
          }} />
          live · FastAPI
        </span>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
      }}>
        {data.map((group) => (
          <div
            key={group.id}
            style={{
              background: "#111827",
              border: "1px solid rgba(99,179,237,0.1)",
              borderRadius: "14px",
              padding: "24px",
              transition: "border-color 0.25s, transform 0.25s",
              cursor: "default",
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
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "18px",
            }}>
              <span style={{
                fontSize: "28px",
                width: "48px", height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(99,179,237,0.08)",
                border: "1px solid rgba(99,179,237,0.15)",
                borderRadius: "10px",
              }}>
                {group.icon}
              </span>
              <h3 style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#f7fafc",
                lineHeight: "1.3",
              }}>
                {group.category}
              </h3>
            </div>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    background: "rgba(99,179,237,0.07)",
                    color: "#a0aec0",
                    border: "1px solid rgba(99,179,237,0.12)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(99,179,237,0.15)";
                    e.target.style.color = "#63b3ed";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(99,179,237,0.07)";
                    e.target.style.color = "#a0aec0";
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
