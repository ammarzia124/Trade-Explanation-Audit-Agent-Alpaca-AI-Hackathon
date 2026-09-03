import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTrades } from '../../context/TradeContext';
import MessageBubble from './MessageBubble';
import SuggestedQuestions from './SuggestedQuestions';
import TypingIndicator from './TypingIndicator';
import TradeExplainCard from './TradeExplainCard';
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
    window.addChatMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };
    return () => { window.addChatMessage = undefined; };
  }, []);

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
      const { answer } = await sendChat(msg);
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
    } catch (err) {
      toast.error('Failed to get response');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite" aria-label="Chat messages">
        {messages.map((msg, i) => (
          <div key={i}>
            <MessageBubble role={msg.role} content={msg.content} />
            {msg.tradeData && <TradeExplainCard data={msg.tradeData} />}
          </div>
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <SuggestedQuestions onSelect={(q) => {
        setMessages(prev => [...prev, { role: 'user', content: q }]);
        setLoading(true);
        sendChat(q).then(({ answer }) => {
          setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
        }).catch(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
        }).finally(() => setLoading(false));
      }} />

      <form onSubmit={handleSend} className="p-4 border-t border-base-border">
        <div className="flex gap-2.5">
          <label htmlFor="chat-input" className="sr-only">Type your message</label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your trades..."
            className="input flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            aria-label="Send message"
            className="btn-primary px-4"
            disabled={loading || !input.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
