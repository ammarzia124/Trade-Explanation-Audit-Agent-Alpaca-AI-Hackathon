import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar/Navbar';
import ChatPanel from './components/Chatbot/ChatPanel';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [demoStatus, setDemoStatus] = useState('');

  const toggleChat = () => {
    console.log('🔵 [APP] Toggling chat. Current:', isChatOpen, '→ New:', !isChatOpen);
    setIsChatOpen(!isChatOpen);
  };

  // ✅ Function to open chat when demo starts
  const handleDemoStart = () => {
    console.log('🔵 [APP] Demo starting - opening chat...');
    setDemoStatus('Opening chat...');
    setIsChatOpen(true);
  };

  // ✅ Function called when demo completes
  const handleDemoComplete = () => {
    console.log('🔵 [APP] Demo complete!');
    setDemoStatus('✅ Demo complete! Check the chat!');
    setTimeout(() => setDemoStatus(''), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* ✅ Pass functions to Navbar */}
      <Navbar 
        onDemoStart={handleDemoStart}
        onDemoComplete={handleDemoComplete}
      />

      {/* Floating button - shows when chat is closed */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed right-6 bottom-6 z-50 bg-[#58A6FF] hover:bg-[#58A6FF]/80 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#3FB950] rounded-full animate-pulse border-2 border-[#0D1117]"></span>
        </button>
      )}

      {/* Main Content */}
      <div className={`pt-16 ${isChatOpen ? 'pr-[420px]' : ''}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Trading Dashboard</h1>
          <p className="text-[#8B949E] text-sm mt-1">
            Monitor portfolio performance, trades and AI risk analysis.
          </p>

          <div className="mt-6 p-4 bg-[#161B22] border border-[#30363D] rounded-lg">
            <p className="text-[#3FB950] font-medium">✅ Chatbot Ready</p>
            <p className="text-[#8B949E] text-sm mt-1">
              Click "Run Demo Trade" to see AI explanation in chat!
            </p>
            <div className="mt-2 flex items-center gap-3 flex-wrap">
              <button
                onClick={toggleChat}
                className="text-[#58A6FF] hover:text-[#58A6FF]/80 text-sm underline"
              >
                {isChatOpen ? '🔒 Close Chatbot' : '📱 Open Chatbot'}
              </button>
              <span className="text-[#8B949E] text-sm">
                Status: {isChatOpen ? '🟢 Open' : '🔴 Closed'}
              </span>
              {demoStatus && (
                <span className="text-[#3FB950] text-sm font-medium">
                  {demoStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <ChatPanel isOpen={isChatOpen} onToggle={toggleChat} />
    </div>
  );
}

export default App;