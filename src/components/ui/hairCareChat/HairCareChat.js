import React, { useState, useRef, useEffect } from "react";

// ─── Groq config ──────────────────────────────────────────────────────────────
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || "";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a professional hair care assistant for TheHairLocs, a premium hair care e-commerce brand.

Rules:
- ONLY answer questions related to hair care, hair products, hair types, and scalp health.
- Help users with issues like hair fall, dandruff, dry hair, oily scalp, frizz, split ends, and colour-treated hair.
- Suggest practical solutions and recommend product types (oils, shampoos, conditioners, serums, masks, etc.).
- Keep answers concise, friendly, and encouraging.
- If the question is NOT related to hair, politely respond: "I'm here only for hair care questions. Feel free to ask me anything about hair! 💇"
- Never mention competitor brands by name.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const WELCOME = {
  role: "assistant",
  content:
    "Hi! I'm your TheHairLocs hair care assistant 💇‍♀️ Ask me anything about hair care, hair problems, or product recommendations!",
};

async function askGroq(messages) {
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "API error");
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Icons (inline SVG so no extra dependency) ────────────────────────────────
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Typing indicator ─────────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={styles.typingWrap}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ ...styles.dot, animationDelay: `${i * 0.18}s` }} />
    ))}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function HairCareChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const reply = await askGroq(
        history.map(({ role, content }) => ({ role, content }))
      );
      setMessages([...history, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ── Floating toggle button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={styles.fab}
        aria-label="Open hair care chat"
        title="Hair Care Assistant"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open && <span style={styles.fabPulse} />}
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div style={styles.window}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerAvatar}>💇</div>
            <div>
              <div style={styles.headerTitle}>Hair Care Assistant</div>
              <div style={styles.headerSub}>TheHairLocs • Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={styles.closeBtn} aria-label="Close chat">
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div style={styles.body}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                {msg.role === "assistant" && <div style={styles.botAvatar}>💇</div>}
                <div style={msg.role === "user" ? styles.userBubble : styles.botBubble}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={styles.botAvatar}>💇</div>
                <div style={styles.botBubble}><TypingDots /></div>
              </div>
            )}

            {error && <div style={styles.errorMsg}>{error}</div>}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length === 1 && (
            <div style={styles.suggestions}>
              {["Hair fall remedies", "Best oil for dry hair", "How to fix dandruff"].map((s) => (
                <button key={s} style={styles.chip} onClick={() => { setInput(s); inputRef.current?.focus(); }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={styles.inputRow}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about hair care…"
              rows={1}
              style={styles.textarea}
              disabled={loading}
            />
            <button onClick={send} disabled={!input.trim() || loading} style={styles.sendBtn} aria-label="Send message">
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* ── Keyframe styles injected once ── */}
      <style>{keyframeCSS}</style>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const BRAND = "#8B5E3C";       // warm brown — matches a hair-care brand
const BRAND_LIGHT = "#f5ede6"; // soft cream

const styles = {
  fab: {
    position: "fixed",
    bottom: 28,
    right: 28,
    width: 58,
    height: 58,
    borderRadius: "50%",
    background: BRAND,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(139,94,60,0.45)",
    zIndex: 9999,
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  fabPulse: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: `2px solid ${BRAND}`,
    animation: "pulse 2s infinite",
    pointerEvents: "none",
  },
  window: {
    position: "fixed",
    bottom: 98,
    right: 28,
    width: 360,
    maxHeight: 560,
    background: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9998,
    fontFamily: "'Segoe UI', sans-serif",
    animation: "slideUp 0.25s ease",
  },
  header: {
    background: BRAND,
    color: "#fff",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  headerAvatar: {
    fontSize: 26,
    background: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  headerTitle: { fontWeight: 700, fontSize: 15, letterSpacing: 0.2 },
  headerSub: { fontSize: 11.5, opacity: 0.8, marginTop: 1 },
  closeBtn: {
    marginLeft: "auto",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: 4,
    opacity: 0.85,
    display: "flex",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "14px 14px 4px",
    background: "#faf8f6",
  },
  botAvatar: {
    fontSize: 18,
    background: BRAND_LIGHT,
    borderRadius: "50%",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginRight: 8,
    alignSelf: "flex-end",
  },
  botBubble: {
    background: "#fff",
    border: `1px solid #e8ddd7`,
    borderRadius: "18px 18px 18px 4px",
    padding: "10px 14px",
    fontSize: 13.5,
    lineHeight: 1.55,
    color: "#333",
    maxWidth: "75%",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  userBubble: {
    background: BRAND,
    color: "#fff",
    borderRadius: "18px 18px 4px 18px",
    padding: "10px 14px",
    fontSize: 13.5,
    lineHeight: 1.55,
    maxWidth: "75%",
  },
  typingWrap: {
    display: "flex",
    gap: 5,
    alignItems: "center",
    padding: "2px 0",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: BRAND,
    display: "inline-block",
    animation: "bounce 0.9s infinite ease-in-out",
  },
  errorMsg: {
    color: "#c0392b",
    fontSize: 12.5,
    textAlign: "center",
    padding: "6px 0",
  },
  suggestions: {
    display: "flex",
    gap: 6,
    padding: "8px 12px 4px",
    flexWrap: "wrap",
    background: "#faf8f6",
    borderTop: "1px solid #f0e9e4",
  },
  chip: {
    background: BRAND_LIGHT,
    border: `1px solid ${BRAND}33`,
    color: BRAND,
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12,
    cursor: "pointer",
    fontWeight: 500,
    transition: "background 0.15s",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    padding: "10px 12px",
    borderTop: "1px solid #f0e9e4",
    background: "#fff",
  },
  textarea: {
    flex: 1,
    resize: "none",
    border: "1.5px solid #ddd",
    borderRadius: 12,
    padding: "9px 12px",
    fontSize: 13.5,
    outline: "none",
    fontFamily: "inherit",
    lineHeight: 1.5,
    color: "#333",
    background: "#faf8f6",
    transition: "border-color 0.2s",
  },
  sendBtn: {
    background: BRAND,
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "opacity 0.2s",
  },
};

const keyframeCSS = `
@keyframes pulse {
  0%   { transform: scale(1);   opacity: 0.8; }
  70%  { transform: scale(1.5); opacity: 0;   }
  100% { transform: scale(1.5); opacity: 0;   }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);     }
}
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0);    }
  40%           { transform: translateY(-6px); }
}
`;