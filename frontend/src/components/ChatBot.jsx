import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function ChatBot() {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState([
    {
      role: "assistant",
      text: "Hi! I'm Umamahesh's AI assistant. Ask me anything about his experience, skills, or projects!",
    },
  ]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const messagesEndRef             = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/chat`, {
        question: userMessage,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: response.data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I'm having trouble connecting. Please email umamahesh.manubolu8@gmail.com directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const BotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #63b3ed, #9f7aea)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0b0f1a",
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(99,179,237,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(99,179,237,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,179,237,0.4)";
        }}
      >
        {isOpen ? <CloseIcon /> : <BotIcon />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div style={{
          position: "fixed",
          bottom: "100px",
          right: "32px",
          width: "360px",
          height: "480px",
          background: "#111827",
          border: "1px solid rgba(99,179,237,0.2)",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          zIndex: 999,
          overflow: "hidden",
        }}>

          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(99,179,237,0.1)",
            background: "linear-gradient(135deg, rgba(99,179,237,0.1), rgba(159,122,234,0.1))",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #63b3ed, #9f7aea)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0b0f1a",
              flexShrink: 0,
            }}>
              <BotIcon />
            </div>
            <div>
              <p style={{ color: "#f7fafc", fontSize: "14px", fontWeight: "700", margin: 0 }}>
                Ask About Umamahesh
              </p>
              <p style={{ color: "#68d391", fontSize: "11px", margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#68d391", display: "inline-block" }} />
                AI Assistant · Powered by RAG
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #63b3ed, #9f7aea)"
                    : "rgba(255,255,255,0.05)",
                  border: msg.role === "user"
                    ? "none"
                    : "1px solid rgba(99,179,237,0.1)",
                  color: msg.role === "user" ? "#0b0f1a" : "#a0aec0",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  fontWeight: msg.role === "user" ? "500" : "400",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 16px",
                  borderRadius: "16px 16px 16px 4px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(99,179,237,0.1)",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#63b3ed",
                      animation: `bounce 1s infinite ${i * 0.2}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(99,179,237,0.1)",
            display: "flex",
            gap: "8px",
            alignItems: "flex-end",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(99,179,237,0.15)",
                borderRadius: "8px",
                color: "#f7fafc",
                fontSize: "13px",
                fontFamily: "inherit",
                outline: "none",
                resize: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                border: "none",
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #63b3ed, #9f7aea)"
                  : "rgba(99,179,237,0.2)",
                color: input.trim() && !loading ? "#0b0f1a" : "#4a5568",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              <SendIcon />
            </button>
          </div>

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div style={{
              padding: "0 16px 12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
            }}>
              {[
                "What are his skills?",
                "Tell me about his experience",
                "What projects has he built?",
                "Is he available for work?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "20px",
                    border: "1px solid rgba(99,179,237,0.2)",
                    background: "transparent",
                    color: "#63b3ed",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "rgba(99,179,237,0.1)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}

export default ChatBot;
