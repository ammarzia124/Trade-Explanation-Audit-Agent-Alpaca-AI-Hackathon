import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check } from 'lucide-react';
import TradeExplainCard from './TradeExplainCard';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  const hasTrade = message.role === 'assistant' && message.tradeData;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-3 max-w-[88%] ${isUser ? 'flex-row-reverse' : ''}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-[#58A6FF]' : 'bg-[#30363D]'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-[#58A6FF]" />
          )}
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-[#58A6FF] text-white rounded-tr-sm' 
            : 'bg-[#161B22] text-gray-200 rounded-tl-sm border border-[#30363D]'
        }`}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
          
          {hasTrade && <TradeExplainCard data={message.tradeData} />}

          <div className={`flex items-center gap-2 mt-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-[10px] opacity-50">
              {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
            </span>
            {!isUser && (
              <button
                onClick={handleCopy}
                className="text-[10px] text-[#8B949E] hover:text-white transition-colors flex items-center gap-1 opacity-60 hover:opacity-100"
              >
                {copied ? (
                  <><Check className="w-3 h-3 text-[#3FB950]" /> Copied</>
                ) : (
                  <><Copy className="w-3 h-3" /> Copy</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;