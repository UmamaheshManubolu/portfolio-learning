import React, { useState, useEffect } from "react";

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
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          70
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          40
        );
      } else {
        setRoleIndex((roleIndex + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 24px 80px",
      }}
    >
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
