import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("error_empty");
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("http://localhost:8000/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error_send");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "#0d1321",
    border: "1px solid rgba(99,179,237,0.15)",
    borderRadius: "8px",
    color: "#f7fafc",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  // SVG icons — professional, no emojis
  const EmailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#63b3ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#63b3ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );

  const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#63b3ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#63b3ed">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );

  const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );

  const infoItems = [
    {
      icon: <EmailIcon />,
      label: "Email",
      value: "umamahesh.manubolu8@gmail.com",
      href: "mailto:umamahesh.manubolu8@gmail.com",
    },
    {
      icon: <PhoneIcon />,
      label: "Phone",
      value: "+49 15777686635",        // ← replace with your real number
      href: "tel:+49 15777686635",         // ← replace with your real number
    },
    {
      icon: <LocationIcon />,
      label: "Location",
      value: "Germany",
      href: null,
    },
  ];

  return (
    <section id="contact" style={{ padding: "80px 32px", background: "#0b0f1a" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontFamily: "monospace", color: "#63b3ed", fontSize: "13px",
            marginBottom: "12px", textTransform: "uppercase", letterSpacing: "2px",
          }}>
            Get in Touch
          </p>
          <h2 style={{ fontSize: "38px", fontWeight: "800", color: "#f7fafc", marginBottom: "16px" }}>
            Let's Work Together
          </h2>
          <p style={{
            fontSize: "15px", color: "#a0aec0",
            maxWidth: "480px", margin: "0 auto", lineHeight: "1.7",
          }}>
            Interested in adding a new team member? I'd love to hear about your company
            and discuss how I can contribute in a full-time role.
          </p>
        </div>

        {/* Two equal columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}>

          {/* LEFT — Contact Info */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f7fafc", marginBottom: "12px" }}>
              Contact Information
            </h3>
            <p style={{ fontSize: "14px", color: "#a0aec0", lineHeight: "1.7", marginBottom: "28px" }}>
              I'm open to full-time opportunities and excited to hear from new teams.
              Whether you have a question or just want to say hi, I'll make sure to get back to you!
            </p>

            {/* Info boxes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {infoItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 18px", borderRadius: "10px",
                    background: "#111827",
                    border: "1px solid rgba(99,179,237,0.1)",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,179,237,0.35)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(99,179,237,0.1)"; }}
                >
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "8px", flexShrink: 0,
                    background: "rgba(99,179,237,0.08)",
                    border: "1px solid rgba(99,179,237,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{
                      fontSize: "11px", color: "#4a5568",
                      textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px",
                    }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer"
                        style={{ fontSize: "13px", color: "#a0aec0", transition: "color 0.2s" }}
                        onMouseEnter={(e) => { e.target.style.color = "#63b3ed"; }}
                        onMouseLeave={(e) => { e.target.style.color = "#a0aec0"; }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: "13px", color: "#a0aec0" }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Follow Me */}
            <div>
              <p style={{
                fontSize: "12px", color: "#4a5568", marginBottom: "12px",
                textTransform: "uppercase", letterSpacing: "1px",
              }}>
                Follow Me
              </p>
              <a
                href="https://www.linkedin.com/in/umamahesh-manubolu/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: "42px", height: "42px", borderRadius: "8px",
                  background: "rgba(99,179,237,0.08)",
                  border: "1px solid rgba(99,179,237,0.2)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(99,179,237,0.18)";
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(99,179,237,0.08)";
                  e.currentTarget.style.borderColor = "rgba(99,179,237,0.2)";
                }}
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div style={{
            background: "#111827",
            border: "1px solid rgba(99,179,237,0.12)",
            borderRadius: "16px",
            padding: "32px",
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#f7fafc", marginBottom: "24px" }}>
              Write a Message
            </h3>

            {/* Name + Email row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <input
                name="name" placeholder="Full Name" value={form.name}
                onChange={handleChange} style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#63b3ed"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(99,179,237,0.15)"; }}
              />
              <input
                name="email" type="email" placeholder="Email" value={form.email}
                onChange={handleChange} style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#63b3ed"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(99,179,237,0.15)"; }}
              />
            </div>

            {/* Subject */}
            <input
              name="subject" placeholder="Subject" value={form.subject}
              onChange={handleChange}
              style={{ ...inputStyle, marginBottom: "12px" }}
              onFocus={(e) => { e.target.style.borderColor = "#63b3ed"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(99,179,237,0.15)"; }}
            />

            {/* Message */}
            <textarea
              name="message" placeholder="Your Message" value={form.message}
              onChange={handleChange} rows={5}
              style={{ ...inputStyle, resize: "vertical", marginBottom: "16px" }}
              onFocus={(e) => { e.target.style.borderColor = "#63b3ed"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(99,179,237,0.15)"; }}
            />

            {/* Status messages */}
            {status === "success" && (
              <div style={{
                padding: "10px 16px", borderRadius: "8px", marginBottom: "14px",
                background: "rgba(104,211,145,0.08)", border: "1px solid rgba(104,211,145,0.25)",
                color: "#68d391", fontSize: "13px",
              }}>
                Message sent! I will get back to you soon.
              </div>
            )}
            {status === "error_empty" && (
              <div style={{
                padding: "10px 16px", borderRadius: "8px", marginBottom: "14px",
                background: "rgba(252,129,129,0.08)", border: "1px solid rgba(252,129,129,0.25)",
                color: "#fc8181", fontSize: "13px",
              }}>
                Please fill in all fields before sending.
              </div>
            )}
            {status === "error_send" && (
              <div style={{
                padding: "10px 16px", borderRadius: "8px", marginBottom: "14px",
                background: "rgba(252,129,129,0.08)", border: "1px solid rgba(252,129,129,0.25)",
                color: "#fc8181", fontSize: "13px",
              }}>
                Something went wrong. Please email me directly.
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", padding: "14px", borderRadius: "8px", border: "none",
                background: loading ? "rgba(99,179,237,0.3)" : "linear-gradient(135deg, #63b3ed, #9f7aea)",
                color: loading ? "#a0aec0" : "#0b0f1a",
                fontSize: "15px", fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "opacity 0.2s", fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <SendIcon />}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;