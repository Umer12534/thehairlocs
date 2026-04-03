import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ChatbotToggleButton.css";

export default function ChatbotToggleButton({ isChatOpen, onToggle }) {
  return (
    <div className={`chat-btn-wrapper ${isChatOpen ? "open-state" : ""}`}>
      <button
        type="button"
        className="chat-btn"
        onClick={onToggle}
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
        aria-expanded={isChatOpen}
      >
        <span className="pulse-dot" />
        <span className="btn-icon">
          <FontAwesomeIcon icon={isChatOpen ? faXmark : faMessage} />
        </span>
        <span className="btn-label">{isChatOpen ? "Close" : "AI Chat"}</span>
      </button>
    </div>
  );
}
