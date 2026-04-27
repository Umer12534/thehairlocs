import React, { useEffect, useRef, useState } from "react";
import ChatbotToggleButton from "../catbotbutton/ChatbotToggleButton";
import "./HairCareChat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
// const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || "";
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || "";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a helpful and friendly assistant. Answer any question the user asks clearly and concisely.`;

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm your assistant. Ask me anything — I'm here to help!",
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
            <FontAwesomeIcon icon={faPlus}/>
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
