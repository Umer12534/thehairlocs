import React, { useEffect, useRef, useState } from "react";
import ChatbotToggleButton from "../catbotbutton/ChatbotToggleButton";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || "";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a professional hair care assistant for TheHairLocs, a premium hair care e-commerce brand.

Rules:
- Only answer questions related to hair care, hair products, hair types, and scalp health.
- Help users with issues like hair fall, dandruff, dry hair, oily scalp, frizz, split ends, and colour-treated hair.
- Suggest practical solutions and recommend product types like oils, shampoos, conditioners, serums, and masks.
- Keep answers concise, friendly, and encouraging.
- If the question is not related to hair, politely respond: "I'm here only for hair care questions. Feel free to ask me anything about hair!"
- Never mention competitor brands by name.`;

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm your TheHairLocs hair care assistant. Ask me anything about hair care, scalp concerns, or product guidance.",
};

const QUICK_PROMPTS = [
  "Hair fall remedies",
  "Best oil for dry hair",
  "How to fix dandruff",
];

async function askGroq(messages) {
  if (!GROQ_API_KEY) {
    throw new Error("Missing Groq API key");
  }

  const response = await fetch(GROQ_API_URL, {
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

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || "API error");
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "Please try again.";
}

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const TypingDots = () => (
  <div className="haircare-chat__typing" aria-label="Assistant is typing">
    <span />
    <span />
    <span />
  </div>
);

export default function HairCareChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 180);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (open && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const closeChat = () => {
    setOpen(false);
    setError("");
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setError("");
  };

  const send = async (presetText) => {
    const text = (presetText ?? input).trim();

    if (!text || loading) {
      return;
    }

    const userMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const reply = await askGroq(
        nextMessages.map(({ role, content }) => ({ role, content }))
      );

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (requestError) {
      setError(
        GROQ_API_KEY
          ? "Something went wrong while fetching the reply. Please try again."
          : "Add REACT_APP_GROQ_API_KEY in your .env file to enable the chatbot."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    send();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <>
      <style>{chatStyles}</style>

      <ChatbotToggleButton
        isChatOpen={open}
        onToggle={() => setOpen((value) => !value)}
      />

      <div
        className={`haircare-chat__overlay ${open ? "is-active" : ""}`}
        onClick={closeChat}
        aria-hidden={!open}
      />

      <aside
        className={`haircare-chat__sidebar ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="haircare-chat__header">
          <div className="haircare-chat__brand">
            <div className="haircare-chat__avatar">THL</div>
            <div>
              <h3>Hair Care Assistant</h3>
              <p>TheHairLocs support for hair and scalp care</p>
            </div>
          </div>

          <button
            type="button"
            className="haircare-chat__icon-button"
            onClick={closeChat}
            aria-label="Close chatbot"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="haircare-chat__messages">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`haircare-chat__message haircare-chat__message--${message.role}`}
            >
              <div className="haircare-chat__bubble">{message.content}</div>
            </div>
          ))}

          {loading && (
            <div className="haircare-chat__message haircare-chat__message--assistant">
              <div className="haircare-chat__bubble">
                <TypingDots />
              </div>
            </div>
          )}

          {error && <p className="haircare-chat__error">{error}</p>}
          <div ref={bottomRef} />
        </div>

        {messages.length === 1 && (
          <div className="haircare-chat__prompts">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="haircare-chat__prompt"
                onClick={() => send(prompt)}
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <form className="haircare-chat__composer" onSubmit={handleSubmit}>
          <button
            type="button"
            className="haircare-chat__clear"
            onClick={resetChat}
            disabled={loading}
          >
            Clear
          </button>

          <textarea
            ref={inputRef}
            className="haircare-chat__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about hair care..."
            rows={1}
            disabled={loading}
          />

          <button
            type="submit"
            className="haircare-chat__send"
            aria-label="Send message"
            disabled={!input.trim() || loading}
          >
            <SendIcon />
          </button>
        </form>
      </aside>
    </>
  );
}

const chatStyles = `
  .haircare-chat__overlay {
    position: fixed;
    inset: 0;
    background: rgba(18, 12, 8, 0.42);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s ease, visibility 0.25s ease;
    z-index: 1098;
  }

  .haircare-chat__overlay.is-active {
    opacity: 1;
    visibility: visible;
  }

  .haircare-chat__sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: min(420px, 100vw);
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(circle at top left, rgba(236, 222, 207, 0.85), transparent 34%),
      linear-gradient(180deg, #fffaf6 0%, #f5eee8 100%);
    border-left: 1px solid rgba(139, 94, 60, 0.15);
    box-shadow: -20px 0 55px rgba(48, 29, 15, 0.16);
    transform: translateX(100%);
    transition: transform 0.28s ease;
    z-index: 1100;
    overflow: hidden;
  }

  .haircare-chat__sidebar.is-open {
    transform: translateX(0);
  }

  .haircare-chat__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 22px 20px 18px;
    background: linear-gradient(135deg, #7a4d2f 0%, #9a6a43 100%);
    color: #ffffff;
  }

  .haircare-chat__brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .haircare-chat__brand h3 {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 700;
  }

  .haircare-chat__brand p {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    opacity: 0.9;
  }

  .haircare-chat__avatar {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.24);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.08em;
    flex-shrink: 0;
  }

  .haircare-chat__icon-button {
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.16);
    color: #ffffff;
    cursor: pointer;
    flex-shrink: 0;
  }

  .haircare-chat__messages {
    flex: 1;
    overflow-y: auto;
    padding: 18px 16px 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .haircare-chat__message {
    display: flex;
  }

  .haircare-chat__message--assistant {
    justify-content: flex-start;
  }

  .haircare-chat__message--user {
    justify-content: flex-end;
  }

  .haircare-chat__bubble {
    max-width: 86%;
    padding: 12px 14px;
    border-radius: 18px;
    font-size: 14px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .haircare-chat__message--assistant .haircare-chat__bubble {
    background: #ffffff;
    color: #35261b;
    border: 1px solid #eaded3;
    border-bottom-left-radius: 6px;
    box-shadow: 0 10px 20px rgba(88, 59, 35, 0.06);
  }

  .haircare-chat__message--user .haircare-chat__bubble {
    background: linear-gradient(135deg, #8b5e3c 0%, #6d4529 100%);
    color: #ffffff;
    border-bottom-right-radius: 6px;
    box-shadow: 0 12px 22px rgba(109, 69, 41, 0.16);
  }

  .haircare-chat__error {
    margin: 0;
    padding: 0 4px;
    color: #b42318;
    font-size: 13px;
    text-align: center;
  }

  .haircare-chat__prompts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 16px 6px;
  }

  .haircare-chat__prompt {
    border: 1px solid rgba(139, 94, 60, 0.18);
    background: rgba(255, 255, 255, 0.86);
    color: #7a4d2f;
    border-radius: 999px;
    padding: 9px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .haircare-chat__composer {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: end;
    padding: 16px;
    background: rgba(255, 255, 255, 0.92);
    border-top: 1px solid #eaded3;
    backdrop-filter: blur(10px);
  }

  .haircare-chat__clear {
    border: 1px solid #e6d6c8;
    background: #fffaf6;
    color: #7a4d2f;
    border-radius: 999px;
    padding: 11px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .haircare-chat__input {
    min-height: 46px;
    max-height: 120px;
    resize: none;
    border: 1px solid #dfcfbf;
    background: #ffffff;
    color: #2d2017;
    border-radius: 18px;
    padding: 12px 14px;
    font: inherit;
    line-height: 1.5;
    outline: none;
  }

  .haircare-chat__input:focus {
    border-color: #8b5e3c;
    box-shadow: 0 0 0 3px rgba(139, 94, 60, 0.12);
  }

  .haircare-chat__send {
    width: 46px;
    height: 46px;
    border: 0;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #8b5e3c 0%, #6d4529 100%);
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 12px 20px rgba(109, 69, 41, 0.2);
  }

  .haircare-chat__send:disabled,
  .haircare-chat__clear:disabled,
  .haircare-chat__prompt:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .haircare-chat__typing {
    display: inline-flex;
    gap: 5px;
    align-items: center;
  }

  .haircare-chat__typing span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #8b5e3c;
    animation: haircare-chat-bounce 0.9s infinite ease-in-out;
  }

  .haircare-chat__typing span:nth-child(2) {
    animation-delay: 0.15s;
  }

  .haircare-chat__typing span:nth-child(3) {
    animation-delay: 0.3s;
  }

  @keyframes haircare-chat-bounce {
    0%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    .haircare-chat__sidebar {
      width: 100vw;
    }

    .haircare-chat__header {
      padding: 18px 16px 16px;
    }

    .haircare-chat__messages {
      padding: 16px 12px 8px;
    }

    .haircare-chat__composer {
      grid-template-columns: 1fr auto;
    }

    .haircare-chat__clear {
      grid-column: 1 / -1;
      justify-self: start;
    }

    .haircare-chat__bubble {
      max-width: 92%;
    }
  }
`;
