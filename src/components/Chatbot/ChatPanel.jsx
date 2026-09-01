import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';
import { sendChatMessage } from '../../services/chatService';

const ChatPanel = ({ isOpen = true, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Log when chat opens/closes
  useEffect(() => {
    console.log('🔵 [CHAT] Panel received isOpen:', isOpen);
  }, [isOpen]);

  // Function to add a message
  const addMessage = (message) => {
    console.log('📥 [CHAT] Adding message:', message);
    setMessages(prev => [...prev, message]);
  };

  // Expose addMessage to window for DemoMode
  useEffect(() => {
    console.log('🔵 [CHAT] Registering window.addChatMessage...');
    window.addChatMessage = (message) => {
      console.log('📥 [CHAT] Received via window.addChatMessage:', message);
      addMessage(message);
    };

    return () => {
      window.addChatMessage = undefined;
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    console.log('🔵 [CHAT] Sending message:', userInput);

    const userMsg = {
      role: 'user',
      content: userInput,
      timestamp: new Date().toISOString()
    };
    addMessage(userMsg);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(userInput);
      console.log('🔵 [CHAT] Response received:', response);

      const aiMsg = {
        role: 'assistant',
        content: response.answer,
        tradeData: response.trade || null,
        timestamp: new Date().toISOString()
      };
      addMessage(aiMsg);

    } catch (err) {
      console.error('❌ [CHAT] Error:', err);
      addMessage({
        role: 'assistant',
        content: '❌ Something went wrong. Please try again.',
        tradeData: null
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // If chat is closed, render nothing (but keep component mounted)
  if (!isOpen) {
    console.log('🔵 [CHAT] Panel is closed, returning null');
    return null;
  }

  console.log('🔵 [CHAT] Panel is open, rendering...');

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed right-0 top-0 h-screen w-[420px] bg-[#0D1117] border-l border-[#30363D] flex flex-col shadow-2xl z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#30363D] bg-[#161B22]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#58A6FF]/20 flex items-center justify-center">
            <Bot className="w-4.5 h-4.5 text-[#58A6FF]" />
          </div>
          <span className="text-white font-semibold text-sm">AI Copilot</span>
          <span className="text-[10px] text-[#3FB950] flex items-center gap-1.5 bg-[#3FB950]/10 px-2 py-0.5 rounded-full border border-[#3FB950]/20">
            <span className="w-1.5 h-1.5 bg-[#3FB950] rounded-full pulse-dot" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearMessages}
            className="text-xs text-[#8B949E] hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#30363D]/50"
          >
            Clear
          </button>
          <button
            onClick={() => {
              console.log('🔵 [CHAT] Close button clicked');
              onToggle();
            }}
            className="text-[#8B949E] hover:text-white transition-colors p-1 rounded-lg hover:bg-[#30363D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-[#8B949E] mt-20">
            <Bot className="w-12 h-12 mx-auto text-[#30363D] mb-3" />
            <p className="text-sm">Ask me about your portfolio</p>
            <p className="text-xs text-[#8B949E]/60 mt-1">
              Try: "Why did we buy AAPL?"
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <SuggestedQuestions onSelect={sendMessage} />
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </motion.div>
  );
};

export default ChatPanel;