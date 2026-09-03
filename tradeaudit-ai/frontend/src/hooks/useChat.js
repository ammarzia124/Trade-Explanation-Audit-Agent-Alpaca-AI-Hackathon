import { useState, useCallback } from 'react';
import { sendChat } from '../lib/alpacaClient';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (message) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setLoading(true);

    try {
      const data = await sendChat(message);
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      return data;
    } catch (err) {
      throw new Error(err.message || 'Chat failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { messages, loading, sendMessage };
}
