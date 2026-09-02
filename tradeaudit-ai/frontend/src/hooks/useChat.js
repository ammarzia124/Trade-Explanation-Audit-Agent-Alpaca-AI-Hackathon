import { useState, useCallback } from 'react';
import api from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (message) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setLoading(true);

    try {
      const { data } = await api.post('/chat', { message });
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Chat failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { messages, loading, sendMessage };
}
