import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { TradeProvider } from './context/TradeContext';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import { ChatDrawerProvider, useChatDrawer } from './components/Chat/ChatDrawer';
import ChatDrawer from './components/Chat/ChatDrawer';
import ErrorBoundary from './components/common/ErrorBoundary';
import DashboardPage from './pages/DashboardPage';
import TradesPage from './pages/TradesPage';
import ChatPage from './pages/ChatPage';
import AuditLogPage from './pages/AuditLogPage';
import { LayoutDashboard, BarChart3, MessageSquare, FileText } from 'lucide-react';

const bottomNavLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trades', label: 'Trades', icon: BarChart3 },
  { to: '/chat', label: 'AI Chat', icon: MessageSquare },
  { to: '/audit', label: 'Audit', icon: FileText },
];

function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-base-border bg-base/95 backdrop-blur-xl md:hidden"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {bottomNavLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-button transition-colors duration-150 min-w-[64px] ${
                isActive
                  ? 'text-accent'
                  : 'text-text-muted hover:text-text-secondary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-micro font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function AppLayout() {
  const { isOpen, close } = useChatDrawer();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base bg-dot-grid">
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-base-light dark:text-text-primary dark:border-base-border',
        }}
      />

      <Navbar onMenuToggle={() => setSidebarOpen(prev => !prev)} />

      <div className="flex pt-14 min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main" role="main" className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-x-hidden max-w-[1440px] mx-auto w-full">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/trades" element={<TradesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/audit" element={<AuditLogPage />} />
            </Routes>
          </ErrorBoundary>

          <footer className="mt-12 border-t border-base-border pt-6 pb-8 text-center" role="contentinfo">
            <p className="text-micro text-text-muted">
              TradeAudit AI &mdash; AI-powered trade monitoring &amp; audit system
            </p>
          </footer>
        </main>
      </div>

      <BottomNav />

      <ChatDrawer isOpen={isOpen} onClose={close} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TradeProvider>
        <ChatDrawerProvider>
          <ErrorBoundary>
            <AppLayout />
          </ErrorBoundary>
        </ChatDrawerProvider>
      </TradeProvider>
    </ThemeProvider>
  );
}
