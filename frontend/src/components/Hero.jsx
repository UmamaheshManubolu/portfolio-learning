import React, { useState, useEffect } from "react";

const roles = [
  "AI Research Engineer",
  "Computer Vision Specialist",
  "Cognitive Robotics Engineer",
  "Deep Learning Researcher",
  "ML Systems Builder",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping]       = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let t;
    if (typing) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        t = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setRoleIndex((roleIndex + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, roleIndex]);

  const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  return (
    <section id="home" style={{
      height: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      overflow: "hidden",
      position: "relative",
      background: "#0b0f1a",
    }}>

      {/* ── LEFT ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "64px 40px 40px 64px",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Tag */}
        <p style={{
          fontSize: "14px", color: "#68d391",
          marginBottom: "12px", fontWeight: "500",
          position: "relative",
        }}>
          Build intelligent AI solutions with
        </p>

        {/* Name */}
        <h1 style={{
          fontSize: "42px",
          fontWeight: "800",
          color: "#63b3ed",
          lineHeight: "1.1",
          marginBottom: "8px",
          letterSpacing: "-1px",
          whiteSpace: "nowrap",
          position: "relative",
        }}>
          Umamahesh Manubolu
        </h1>

        {/* Typing role */}
        <div style={{
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          marginBottom: "18px",
          position: "relative",
        }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "800",
            color: "#f7fafc",
            letterSpacing: "-0.5px",
            margin: 0,
            borderRight: "3px solid #63b3ed",
            paddingRight: "8px",
            lineHeight: "1.2",
          }}>
            {displayed}
          </h2>
        </div>

        {/* Bio */}
        <p style={{
          fontSize: "14px",
          color: "#a0aec0",
          lineHeight: "1.75",
          marginBottom: "28px",
          maxWidth: "440px",
          position: "relative",
        }}>
          Research-focused AI Engineer with 3+ years in Machine Learning,
          Computer Vision, Cognitive Robotics, and Intelligent Perception
          in Technical Systems. Strong foundation in applied mathematics
          with advanced Python and C++ programming skills.
        </p>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: "12px",
          marginBottom: "28px", flexWrap: "wrap",
          position: "relative",
        }}>
          <a href="#projects" style={{
            padding: "11px 26px", borderRadius: "6px",
            background: "linear-gradient(135deg, #63b3ed, #9f7aea)",
            color: "#0b0f1a", fontWeight: "700", fontSize: "14px",
            textDecoration: "none", display: "flex",
            alignItems: "center", gap: "8px", transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            View Projects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>

          <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{
            padding: "11px 26px", borderRadius: "6px",
            border: "1.5px solid rgba(99,179,237,0.4)",
            color: "#63b3ed", fontWeight: "600", fontSize: "14px",
            textDecoration: "none", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(99,179,237,0.08)";
            e.currentTarget.style.borderColor = "#63b3ed";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(99,179,237,0.4)";
          }}
          >
            Download CV
          </a>
        </div>

        {/* Social icons */}
        <div style={{ display: "flex", gap: "10px", position: "relative" }}>
          <a href="https://www.linkedin.com/in/umamahesh-manubolu/"
            target="_blank" rel="noreferrer"
            style={{
              width: "42px", height: "42px", borderRadius: "8px",
              background: "rgba(99,179,237,0.08)",
              border: "1px solid rgba(99,179,237,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#63b3ed", textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,179,237,0.2)";
              e.currentTarget.style.borderColor = "#63b3ed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(99,179,237,0.08)";
              e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
            }}
          >
            <LinkedInIcon />
          </a>
          <a href="mailto:umamahesh.manubolu8@gmail.com"
            style={{
              width: "42px", height: "42px", borderRadius: "8px",
              background: "rgba(99,179,237,0.08)",
              border: "1px solid rgba(99,179,237,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#63b3ed", textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,179,237,0.2)";
              e.currentTarget.style.borderColor = "#63b3ed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(99,179,237,0.08)";
              e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
            }}
          >
            <EmailIcon />
          </a>
        </div>

      </div>

      {/* ── RIGHT — Photo with rounded frame like Kiran's ── */}
      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px 40px 24px",
      }}>

        {/* Accent square — top right corner, exactly like Kiran's */}
        <div style={{
          position: "absolute",
          top: "72px",
          right: "16px",
          width: "52px",
          height: "52px",
          borderRadius: "10px",
          background: "rgba(99,179,237,0.25)",
          border: "1px solid rgba(99,179,237,0.4)",
          zIndex: 2,
        }} />

        {/* Accent dot — bottom left */}
        <div style={{
          position: "absolute",
          bottom: "80px",
          left: "12px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "rgba(99,179,237,0.5)",
          zIndex: 2,
        }} />

        {/* Photo frame — rounded rectangle like Kiran's */}
        <div style={{
          width: "100%",
          maxWidth: "380px",
          height: "480px",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          border: "1px solid rgba(99,179,237,0.15)",
        }}>
          <img
            src="/avatar.jpg"
            alt="Umamahesh Manubolu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        </div>

      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute",
        bottom: "24px",
        left: "64px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#4a5568",
        fontSize: "11px",
        fontFamily: "monospace",
        letterSpacing: "1px",
        textTransform: "uppercase",
        zIndex: 2,
      }}>
        <div style={{ width: "32px", height: "1px", background: "rgba(99,179,237,0.4)" }} />
        scroll down
      </div>

    </section>
  );
}

export default Hero;
