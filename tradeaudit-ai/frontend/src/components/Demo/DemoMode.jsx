import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../../services/chatService';

const DemoMode = ({ onDemoStart, onDemoComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('');

  const runDemoTrade = async () => {
    setIsRunning(true);
    setStatus('Opening chat...');
    try {
      if (onDemoStart) {
        onDemoStart();
        setStatus('Chat opened, getting AI explanation...');
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await sendChatMessage('Explain last trade');
      if (window.addChatMessage && response.answer) {
        window.addChatMessage({
          role: 'user',
          content: 'Explain last trade',
          timestamp: new Date().toISOString()
        });
        window.addChatMessage({
          role: 'assistant',
          content: response.answer,
          tradeData: response.trade || null,
          timestamp: new Date().toISOString()
        });
        setStatus('AI explanation added to chat!');
      } else {
        setStatus('Chat not ready');
      }
      if (onDemoComplete) onDemoComplete();
    } catch (error) {
      console.error('Demo error:', error);
      setStatus('Error occurred');
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
        className="btn-primary"
      >
        {isRunning ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Executing...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Run Demo</span>
          </>
        )}
      </button>
      {status && (
        <span className="text-micro text-text-muted">{status}</span>
      )}
    </div>
  );
};

export default DemoMode;
