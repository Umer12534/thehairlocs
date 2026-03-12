import { useState } from "react";
import "./ChatbotToggleButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatbotToggleButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <div className={`chat-btn-wrapper ${isOpen ? "open-state" : ""}`}>
            <button
            className="chat-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close chat" : "Open chat"}
            >
            <span className="pulse-dot" />

            <span className="btn-icon">
                <FontAwesomeIcon icon={isOpen ? faXmark : faMessage} />
            </span>

            <span className="btn-label">{isOpen ? "Close" : "AI Chat"}</span>
            </button>
        </div>
        </>
    );
}