import { Link } from 'react-router-dom';
import { Sparkles, WifiOff, Sun, Moon, MessageSquare, Menu } from 'lucide-react';
import { useTrades } from '../../context/TradeContext';
import { useTheme } from '../../context/ThemeContext';
import { useChatDrawer } from '../Chat/ChatDrawer';
import DemoMode from '../Demo/DemoMode';

export default function Navbar({ onMenuToggle }) {
  const { wsConnected, account } = useTrades();
  const { isDark, toggleTheme } = useTheme();
  const { isOpen: isChatOpen, toggle: toggleChat } = useChatDrawer();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-base-border bg-base/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 h-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-button text-text-secondary transition-colors duration-150 hover:bg-base-elevated hover:text-text-primary md:hidden"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-button bg-accent-muted">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <span className="text-body font-semibold text-text-primary">TradeAudit AI</span>
            <span className="hidden text-micro text-text-muted sm:inline">| Alpaca Hackathon 2026</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-pill border border-success/20 bg-success-muted px-3 py-1.5"
          >
            {wsConnected ? (
              <>
                <span className="h-2 w-2 rounded-full bg-success pulse-dot" />
                <span className="text-micro font-medium text-success">LIVE</span>
              </>
            ) : (
              <>
                <WifiOff size={12} className="text-text-muted" />
                <span className="text-micro font-medium text-text-muted">Offline</span>
              </>
            )}
          </div>

          {account && (
            <div className="text-right px-3 py-1.5 rounded-card bg-base-elevated border border-base-border hidden sm:block">
              <div className="text-body font-semibold text-text-primary tabular-nums">
                ${Number(account.equity).toLocaleString()}
              </div>
              <div className="text-micro text-text-muted leading-tight">Equity</div>
            </div>
          )}

          <DemoMode onDemoStart={() => { if (!isChatOpen) toggleChat(); }} />

          <button
            onClick={toggleChat}
            aria-label={isChatOpen ? 'Close AI chat' : 'Open AI chat'}
            className={`flex h-10 w-10 items-center justify-center rounded-button transition-all duration-150 ${
              isChatOpen
                ? 'bg-accent-muted text-accent border border-accent/20'
                : 'text-text-secondary hover:bg-base-elevated hover:text-text-primary border border-transparent'
            }`}
          >
            <MessageSquare size={18} />
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-10 w-10 items-center justify-center rounded-button text-text-secondary transition-colors duration-150 hover:bg-base-elevated hover:text-text-primary border border-transparent"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
