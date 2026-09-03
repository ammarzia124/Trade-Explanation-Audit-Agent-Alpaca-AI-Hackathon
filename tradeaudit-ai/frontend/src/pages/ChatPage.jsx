import ChatInterface from '../components/Chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="space-y-section">
      <div>
        <h1 className="text-display text-text-primary">AI Trade Assistant</h1>
        <p className="section-subtitle">Ask questions about your trades, portfolio, or risk analysis</p>
      </div>
      <div className="card p-0 h-[calc(100vh-14rem)]">
        <ChatInterface />
      </div>
    </div>
  );
}
