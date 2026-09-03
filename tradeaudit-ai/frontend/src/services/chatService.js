import { sendChat } from '../lib/alpacaClient';

export const sendChatMessage = async (question) => {
  try {
    const result = await sendChat(question);
    return {
      answer: result.answer || 'No response from AI',
      trade: result.trade || null,
    };
  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      answer: error.message || 'Cannot connect to server. Please check if the backend is running.',
      trade: null,
    };
  }
};
