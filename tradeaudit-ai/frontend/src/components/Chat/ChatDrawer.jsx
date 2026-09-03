import { useState, createContext, useContext } from 'react';
import { X, MessageSquare } from 'lucide-react';
import ChatInterface from './ChatInterface';

const ChatDrawerContext = createContext();

export function useChatDrawer() {
  return useContext(ChatDrawerContext);
}

export function ChatDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  return (
    <ChatDrawerContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </ChatDrawerContext.Provider>
  );
}

export default function ChatDrawer({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-200 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        role="complementary"
        aria-label="AI chat panel"
        className={`fixed right-0 top-0 h-full w-[384px] max-w-[calc(100vw-2rem)] bg-base border-l border-base-border z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-border bg-base-light/80 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-button bg-accent-muted">
              <MessageSquare size={16} className="text-accent" />
            </div>
            <span className="text-body font-semibold text-text-primary">AI Trade Assistant</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-button text-text-secondary transition-colors duration-150 hover:bg-base-elevated hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </aside>
    </>
  );
}
