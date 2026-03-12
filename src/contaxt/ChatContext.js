import { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you with hair locs, products, or orders today?",
      sender: 'ai',
      timestamp: new Date().toISOString(),
    },
  ]);

  const openChat = useCallback(() => setIsChatOpen(true), []);
  const closeChat = useCallback(() => setIsChatOpen(false), []);

  const sendMessage = useCallback(async (text) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response (placeholder; replace with real API like OpenAI)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
      text: `Thank you for your message: "${text}". For hair locs inquiries, check our products section! (Demo response)`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  }, []);

  const clearChat = useCallback(() => setMessages([]), []);

  return (
    <ChatContext.Provider value={{
      isChatOpen,
      openChat,
      closeChat,
      messages,
      sendMessage,
      clearChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
