import React, { useState, useEffect } from "react";

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
        maxWidth: "900px", margin: "0 auto", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          color: "#63b3ed", fontFamily: "monospace",
          fontSize: "20px", fontWeight: "700",
        }}>
          UM Portfolio
        </span>
        <div style={{ display: "flex", gap: "32px" }}>
          {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
            <a
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
