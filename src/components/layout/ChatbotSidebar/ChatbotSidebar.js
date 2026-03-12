import React, { useRef, useEffect } from 'react';
import './ChatbotSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { useChat } from '../../../contaxt/ChatContext';

function ChatbotSidebar({ onClose }) {
    const { messages, sendMessage, clearChat, isChatOpen } = useChat();
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isChatOpen) {
        inputRef.current?.focus();
        }
    }, [isChatOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.message.value.trim();
        if (text) {
        sendMessage(text);
        e.target.message.value = '';
        }
    };

    return (
        <div className={`chatbot-sidebar ${isChatOpen ? 'active' : ''}`}>
        <div className="chatbot-header">
            <div className="chatbot-header-text">
            <FontAwesomeIcon icon={faCommentDots} className="chat-icon" />
            AI Assistant
            </div>
            <button className="close-btn" onClick={onClose} aria-label="Close chat">
            <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>

        <div className="chatbot-messages">
            {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                </div>
            </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
            <button 
            type="button" 
            className="clear-chat-btn" 
            onClick={clearChat}
            title="Clear chat"
            >
            Clear
            </button>
            <input
            ref={inputRef}
            type="text"
            name="message"
            placeholder="Type your message..."
            maxLength={500}
            />
            <button type="submit" className="send-btn" aria-label="Send message">
            <FontAwesomeIcon icon={faCommentDots} />
            </button>
        </form>
        </div>
    );
}

export default ChatbotSidebar;
