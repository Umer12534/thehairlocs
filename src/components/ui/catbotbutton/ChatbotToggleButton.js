import { useChat } from "../../../contaxt/ChatContext";
import "./ChatbotToggleButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatbotToggleButton() {
    const { isChatOpen, openChat, closeChat } = useChat();

    const toggleChat = () => {
      if (isChatOpen) {
        closeChat();
      } else {
        openChat();
      }
    };

    return (
        <>
        <div className={`chat-btn-wrapper ${isChatOpen ? "open-state" : ""}`}>
            <button
            className="chat-btn"
            onClick={toggleChat}
            aria-label={isChatOpen ? "Close chat" : "Open chat"}
            >
            <span className="pulse-dot" />

            <span className="btn-icon">
                <FontAwesomeIcon icon={isChatOpen ? faXmark : faMessage} />
            </span>

            <span className="btn-label">{isChatOpen ? "Close" : "AI Chat"}</span>
            </button>
        </div>
        </>
    );
}