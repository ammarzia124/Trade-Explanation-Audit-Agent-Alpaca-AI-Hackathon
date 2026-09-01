import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../../services/chatService';

const DemoMode = ({ onDemoStart, onDemoComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('');

  const runDemoTrade = async () => {
    console.log('🔵 [DEMO] Button clicked!');
    setIsRunning(true);
    setStatus('⏳ Opening chat...');
    
    try {
      // ✅ STEP 1: Open the chat panel first
      if (onDemoStart) {
        console.log('🔵 [DEMO] Opening chat panel...');
        onDemoStart();
        setStatus('⏳ Chat opened, getting AI explanation...');
      }
      
      // Wait a moment for chat to open
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // ✅ STEP 2: Get AI explanation
      console.log('🔵 [DEMO] Getting AI explanation...');
      const response = await sendChatMessage('Explain last trade');
      console.log('🔵 [DEMO] Response received:', response);
      
      // ✅ STEP 3: Add message to chat
      if (window.addChatMessage && response.answer) {
        console.log('📤 [DEMO] Adding message to chat...');
        
        // Add user message
        window.addChatMessage({
          role: 'user',
          content: 'Explain last trade',
          timestamp: new Date().toISOString()
        });
        
        // Add AI response
        window.addChatMessage({
          role: 'assistant',
          content: response.answer,
          tradeData: response.trade || null,
          timestamp: new Date().toISOString()
        });
        
        setStatus('✅ AI explanation added to chat!');
        console.log('✅ [DEMO] Message sent to chat!');
      } else {
        console.log('⚠️ [DEMO] window.addChatMessage not available!');
        setStatus('❌ Chat not ready');
      }
      
      // ✅ STEP 4: Notify parent that demo is complete
      if (onDemoComplete) {
        onDemoComplete();
      }
      
      console.log('✅ [DEMO] Demo trade completed!');
      
    } catch (error) {
      console.error('❌ [DEMO] Error:', error);
      setStatus('❌ Error occurred');
    } finally {
      setIsRunning(false);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={runDemoTrade}
        disabled={isRunning}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#58A6FF] to-purple-600 hover:from-[#58A6FF]/80 hover:to-purple-600/80 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-[#58A6FF]/25 disabled:opacity-50 text-sm"
      >
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Executing...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>🚀 Run Demo Trade</span>
          </>
        )}
      </button>
      
      {status && (
        <span className={`text-xs ${
          status.includes('✅') ? 'text-[#3FB950]' : 
          status.includes('❌') ? 'text-[#F85149]' : 
          'text-[#8B949E]'
        }`}>
          {status}
        </span>
      )}
    </div>
  );
};

export default DemoMode;