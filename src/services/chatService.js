import axios from 'axios';
import { getMockResponse } from '../data/mockData';

// ============================================================
// CHAT SERVICE - CONNECTED TO AMMAR'S BACKEND
// ============================================================

// ⭐ CHANGE THIS TO false TO USE REAL API ⭐
const USE_MOCK_DATA = true;  // ← SET TO false

// Read Ammar's backend URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const sendChatMessage = async (question) => {
  console.log('🔵 [SERVICE] sendChatMessage called with:', question);
  
  // If using mock data (fallback)
  if (USE_MOCK_DATA) {
    console.log('🔵 [SERVICE] Using mock data...');
    const delay = 300 + Math.random() * 500;
    await new Promise(resolve => setTimeout(resolve, delay));
    const response = getMockResponse(question);
    console.log('🔵 [SERVICE] Mock response:', response);
    return response;
  }
  
  // REAL API CALL to Ammar's backend
  try {
    // ✅ FIX: Remove trailing slash to avoid double slashes
    const baseUrl = API_BASE_URL.replace(/\/+$/, '');  // Remove trailing slash
    const url = `${baseUrl}/api/chat`;  // Only add one slash
    
    console.log('🟢 [API] Sending to Ammar\'s backend:', question);
    console.log('🟢 [API] URL:', url);
    
    const response = await axios.post(url, {
      question: question
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('🟢 [API] Response status:', response.status);
    console.log('🟢 [API] Response data:', response.data);
    
    // Format response to match expected structure
    return {
      answer: response.data.answer || response.data.message || 'No response from AI',
      trade: response.data.trade || null
    };
    
  } catch (error) {
    console.error('🔴 [API] Error:', error);
    
    // Show detailed error
    if (error.response) {
      console.error('🔴 Server responded with:', error.response.status, error.response.data);
      // If server returns error message, show it
      if (error.response.data && error.response.data.message) {
        return {
          answer: `❌ Server error: ${error.response.data.message}`,
          trade: null
        };
      }
    } else if (error.request) {
      console.error('🔴 No response from server. Is Ammar\'s backend running?');
      console.error('🔴 URL attempted:', `${API_BASE_URL}/api/chat`);
      return {
        answer: '❌ Cannot connect to server. Please check if Ammar\'s backend is running.',
        trade: null
      };
    } else {
      console.error('🔴 Error:', error.message);
    }
    
    // Fallback to mock data if API fails
    console.log('🟡 [FALLBACK] Using mock response...');
    const fallbackResponse = getMockResponse(question);
    return fallbackResponse;
  }
};