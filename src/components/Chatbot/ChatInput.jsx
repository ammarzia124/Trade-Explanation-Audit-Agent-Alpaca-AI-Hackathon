import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[#30363D] p-4 bg-[#161B22]">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about trades..."
          disabled={isLoading}
          className="flex-1 bg-[#0D1117] text-white placeholder-[#8B949E] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#58A6FF]/50 border border-[#30363D] focus:border-[#58A6FF]/50 disabled:opacity-50 transition-all duration-200"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-[#58A6FF] hover:bg-[#58A6FF]/80 disabled:opacity-40 disabled:hover:bg-[#58A6FF] text-white rounded-xl px-4 py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#58A6FF]/25"
        >
          <Send className="w-4.5 h-4.5" />
        </motion.button>
      </div>
    </form>
  );
};

export default ChatInput;