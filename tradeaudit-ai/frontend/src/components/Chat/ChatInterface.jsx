import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useTrades } from '../../context/TradeContext';
import MessageBubble from './MessageBubble';
import toast from 'react-hot-toast';

export default function ChatInterface() {
  const { sendChat } = useTrades();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m TradeAudit AI. Ask me anything about your trades — risk analysis, trade summaries, portfolio questions, or anything else.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const msg = input.trim();
    if (!msg || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);

    try {
      const { response } = await sendChat(msg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      toast.error('Failed to get response');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Bot size={16} />
            <span className="text-sm">Thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your trades..."
            className="input-field flex-1"
            disabled={loading}
          />
          <button type="submit" className="btn-primary flex items-center gap-2" disabled={loading || !input.trim()}>
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
