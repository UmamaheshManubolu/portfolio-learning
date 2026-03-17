import os

# This script writes all React component files directly
# avoiding copy-paste corruption from the chat

base = "frontend/src/components"
os.makedirs(base, exist_ok=True)

# ── Navbar ──────────────────────────────────────────────
navbar = '''import React, { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      zIndex: 1000, padding: "0 24px",
      background: scrolled ? "rgba(11,15,26,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(99,179,237,0.1)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: "900px", margin: "0 auto",
        height: "64px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          color: "#63b3ed", fontFamily: "monospace",
          fontSize: "20px", fontWeight: "700",
        }}>
          UM Portfolio
        </span>
        <div style={{ display: "flex", gap: "32px" }}>
          {["About","Experience","Skills","Projects","Contact"].map((item) => (
            
              key={item}
              href={"#" + item.toLowerCase()}
              style={{ color: "#a0aec0", textDecoration: "none", fontSize: "14px" }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
'''

# ── Hero ─────────────────────────────────────────────────
hero = '''import React, { useState, useEffect } from "react";

const roles = [
  "AI Research Engineer",
  "Computer Vision Specialist",
  "Cognitive Robotics Engineer",
  "Deep Learning Researcher",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((roleIndex + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center",
      padding: "120px 24px 80px",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>

        <p style={{
          fontFamily: "monospace", color: "#63b3ed",
          fontSize: "16px", marginBottom: "16px",
        }}>
          Hello, I am
        </p>

        <h1 style={{
          fontSize: "64px", fontWeight: "800",
          lineHeight: "1.1", color: "#f7fafc",
          marginBottom: "16px", letterSpacing: "-2px",
        }}>
          Umamahesh
          <br />
          <span style={{ color: "#63b3ed" }}>Manubolu</span>
        </h1>

        <div style={{
          fontFamily: "monospace", fontSize: "20px",
          marginBottom: "24px", color: "#f7fafc", height: "32px",
        }}>
          <span style={{ color: "#68d391" }}>{"$ "}</span>
          <span>{displayed}</span>
          <span style={{ color: "#63b3ed" }}>|</span>
        </div>

        <p style={{
          fontSize: "17px", color: "#a0aec0",
          maxWidth: "560px", lineHeight: "1.8", marginBottom: "36px",
        }}>
          Research-focused AI Engineer with 3+ years in Machine Learning,
          Computer Vision, and Cognitive Robotics. Building intelligent
          systems that perceive and understand the world.
        </p>

        <div style={{ display: "flex", gap: "16px", marginBottom: "60px" }}>
          <a href="#projects" style={{
            padding: "12px 28px", borderRadius: "8px",
            background: "#63b3ed", color: "#0b0f1a",
            fontWeight: "700", fontSize: "15px", textDecoration: "none",
          }}>
            View My Work
          </a>
          <a href="#contact" style={{
            padding: "12px 28px", borderRadius: "8px",
            border: "1.5px solid rgba(99,179,237,0.4)",
            color: "#63b3ed", fontWeight: "600",
            fontSize: "15px", textDecoration: "none",
          }}>
            Get In Touch
          </a>
        </div>

        <div style={{ display: "flex", gap: "48px" }}>
          {[
            { num: "3+",  label: "Years in AI/ML" },
            { num: "10+", label: "Projects Built"  },
            { num: "5+",  label: "Research Areas"  },
          ].map((s) => (
            <div key={s.label}>
              <div style={{
                fontSize: "32px", fontWeight: "800",
                color: "#63b3ed", fontFamily: "monospace", lineHeight: "1",
              }}>
                {s.num}
              </div>
              <div style={{
                fontSize: "12px", color: "#4a5568",
                textTransform: "uppercase", letterSpacing: "1px", marginTop: "4px",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Hero;
'''

# ── AboutMe ──────────────────────────────────────────────
about = '''import React, { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/about_me.js";

function AboutMe() {
  const [data, setData]       = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/about")
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="about" style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px" }}>

      <p style={{ fontFamily: "monospace", color: "#63b3ed", fontSize: "13px", marginBottom: "8px" }}>
        {"// about_me"}
      </p>
      <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#f7fafc", marginBottom: "8px" }}>
        About <span style={{ color: "#63b3ed" }}>Me</span>
      </h2>
      <div style={{ width: "50px", height: "3px", background: "#63b3ed", borderRadius: "2px", marginBottom: "40px" }} />

      {!loading && !error && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "11px", color: "#68d391",
          background: "rgba(104,211,145,0.08)",
          border: "1px solid rgba(104,211,145,0.2)",
          padding: "4px 10px", borderRadius: "20px", marginBottom: "32px",
          fontFamily: "monospace",
        }}>
          live data · FastAPI
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "48px" }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "160px", height: "160px", borderRadius: "16px",
            background: "linear-gradient(135deg, #1a2438, #2d3748)",
            border: "2px solid rgba(99,179,237,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "36px", fontWeight: "800", color: "#63b3ed", fontFamily: "monospace",
          }}>
            UM
          </div>
          <div style={{
            fontSize: "12px", padding: "6px 12px", borderRadius: "20px",
            background: "rgba(104,211,145,0.08)",
            border: "1px solid rgba(104,211,145,0.2)",
            color: "#68d391", textAlign: "center",
          }}>
            {data.available ? "Available for work" : "Not available"}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#f7fafc", marginBottom: "6px" }}>
            {data.name}
          </h3>
          <p style={{ fontSize: "16px", color: "#63b3ed", fontWeight: "500", marginBottom: "4px" }}>
            {data.title}
          </p>
          <p style={{ fontSize: "14px", color: "#a0aec0", marginBottom: "20px" }}>
            {data.location}
          </p>
          <p style={{ fontSize: "15px", color: "#a0aec0", lineHeight: "1.9", marginBottom: "24px" }}>
            {data.bio}
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <a href={"mailto:" + data.email} style={{ color: "#63b3ed", textDecoration: "none", fontSize: "14px" }}>
              {data.email}
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer"
              style={{ color: "#63b3ed", textDecoration: "none", fontSize: "14px" }}>
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutMe;
'''

# ── Experience ───────────────────────────────────────────
experience = '''import React, { useState, useEffect } from "react";
import axios from "axios";
import staticData from "../data/experience.js";

function Experience() {
  const [data, setData]       = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/experience")
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="experience" style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px" }}>

      <p style={{ fontFamily: "monospace", color: "#63b3ed", fontSize: "13px", marginBottom: "8px" }}>
        {"// work_history"}
      </p>
      <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#f7fafc", marginBottom: "8px" }}>
        Work <span style={{ color: "#63b3ed" }}>Experience</span>
      </h2>
      <div style={{ width: "50px", height: "3px", background: "#63b3ed", borderRadius: "2px", marginBottom: "40px" }} />

      {!loading && !error && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "11px", color: "#68d391",
          background: "rgba(104,211,145,0.08)",
          border: "1px solid rgba(104,211,145,0.2)",
          padding: "4px 10px", borderRadius: "20px", marginBottom: "32px",
          fontFamily: "monospace",
        }}>
          live data · FastAPI
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.map((job, i) => (
          <div key={job.id} style={{ display: "flex", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6px" }}>
              <div style={{
                width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
                background: "#63b3ed", border: "3px solid #0b0f1a",
                boxShadow: "0 0 12px rgba(99,179,237,0.5)",
              }} />
              {i < data.length - 1 && (
                <div style={{ width: "2px", flex: 1, background: "rgba(99,179,237,0.15)", margin: "6px 0", minHeight: "40px" }} />
              )}
            </div>

            <div style={{
              flex: 1,
              background: "#111827",
              border: "1px solid rgba(99,179,237,0.1)",
              borderRadius: "12px", padding: "24px", marginBottom: "24px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f7fafc", marginBottom: "4px" }}>
                    {job.role}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#63b3ed", fontWeight: "500" }}>
                    {job.company} · {job.location}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#a0aec0", marginBottom: "4px" }}>
                    {job.period}
                  </p>
                  <span style={{
                    fontSize: "11px", background: "rgba(159,122,234,0.1)",
                    color: "#9f7aea", padding: "3px 10px", borderRadius: "10px",
                    border: "1px solid rgba(159,122,234,0.2)",
                  }}>
                    {job.type}
                  </span>
                </div>
              </div>

              <ul style={{ listStyle: "none", marginBottom: "16px" }}>
                {job.highlights.map((point, idx) => (
                  <li key={idx} style={{ fontSize: "14px", color: "#a0aec0", lineHeight: "1.8", marginBottom: "4px" }}>
                    <span style={{ color: "#63b3ed", marginRight: "8px" }}>▸</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {job.tech.map((t) => (
                  <span key={t} style={{
                    display: "inline-block", padding: "3px 12px", borderRadius: "20px",
                    fontSize: "12px", fontFamily: "monospace",
                    background: "rgba(99,179,237,0.1)", color: "#63b3ed",
                    border: "1px solid rgba(99,179,237,0.15)",
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
'''

# ── Write all files ──────────────────────────────────────
files = {
    f"{base}/Navbar.jsx":     navbar,
    f"{base}/Hero.jsx":       hero,
    f"{base}/AboutMe.jsx":    about,
    f"{base}/Experience.jsx": experience,
}

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Written: {path}")

print("\n🎉 All components written successfully!")
print("Check your browser at http://localhost:5173")