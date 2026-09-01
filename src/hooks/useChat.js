import { useState } from 'react';
import { sendChatMessage } from '../services/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    console.log('🔵 [CHAT] Sending message:', userInput);

    // Add user message
    const userMsg = {
      role: 'user',
      content: userInput,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(userInput);
      
      console.log('🔵 [CHAT] Response received:', response);

      // Add AI message
      const aiMsg = {
        role: 'assistant',
        content: response.answer,
        tradeData: response.trade || null,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);

      return response;

    } catch (err) {
      console.error('❌ [CHAT] Error:', err);
      setError('Failed to get response');
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Something went wrong. Please try again.',
          tradeData: null
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
};