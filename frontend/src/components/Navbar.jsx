import React, { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home",       href: "#home"       },
    { label: "About",      href: "#about"      },
    { label: "Skills",     href: "#skills"     },
    { label: "Projects",   href: "#projects"   },
    { label: "Experience", href: "#experience" },
    { label: "Contact",    href: "#contact"    },
  ];

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 999,
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 64px",
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(11,15,26,0.97)" : "rgba(11,15,26,0.6)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid rgba(99,179,237,0.1)" : "1px solid transparent",
    }}>

      {/* Logo */}
      <a href="#home" style={{
        fontSize: "15px",
        fontWeight: "800",
        textDecoration: "none",
        letterSpacing: "0.5px",
        fontFamily: "monospace",
      }}>
        <span style={{ color: "#63b3ed" }}>UMAMAHESH </span>
        <span style={{ color: "#9f7aea" }}>MANUBOLU</span>
        <span style={{ color: "#63b3ed" }}>.</span>
      </a>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: "#a0aec0",
              fontSize: "14px",
              fontWeight: "500",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.color = "#f7fafc"; }}
            onMouseLeave={(e) => { e.target.style.color = "#a0aec0"; }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        style={{
          padding: "9px 24px",
          borderRadius: "6px",
          background: "linear-gradient(135deg, #63b3ed, #9f7aea)",
          color: "#0b0f1a",
          fontSize: "13px",
          fontWeight: "700",
          textDecoration: "none",
          transition: "opacity 0.2s",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        Hire Me
      </a>

    </nav>
  );
}

export default Navbar;
