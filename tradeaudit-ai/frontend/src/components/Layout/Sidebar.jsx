import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BarChart3, MessageSquare, FileText, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trades', label: 'Trades', icon: BarChart3 },
  { to: '/chat', label: 'AI Chat', icon: MessageSquare },
  { to: '/audit', label: 'Audit Log', icon: FileText },
];

function SidebarLink({ to, label, icon: Icon, isCollapsed, onClick }) {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      aria-label={isCollapsed ? label : undefined}
      className={`flex items-center gap-3 rounded-button px-3 py-2.5 text-body font-medium transition-colors duration-150 ${
        isActive
          ? 'bg-accent-muted text-accent'
          : 'text-text-secondary hover:bg-base-elevated hover:text-text-primary'
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar - full (≥1024px) */}
      <aside
        aria-label="Dashboard navigation"
        className="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-base-border bg-base sticky top-14 h-[calc(100vh-56px)]"
      >
        <div className="p-4">
          <p className="text-micro font-medium text-text-muted uppercase tracking-wider">Navigation</p>
        </div>

        <nav className="flex-1 space-y-1 px-3" aria-label="Dashboard sections">
          {links.map(({ to, label, icon }) => (
            <SidebarLink key={to} to={to} label={label} icon={icon} />
          ))}
        </nav>

        <div className="mx-3 mb-4 rounded-card bg-base-elevated p-4 border border-base-border">
          <p className="text-caption font-medium text-text-primary">TradeAudit AI</p>
          <p className="text-micro text-text-muted mt-1">AI Trade Monitoring</p>
        </div>
      </aside>

      {/* Tablet sidebar - icon only (768-1023px) */}
      <aside
        aria-label="Dashboard navigation"
        className="hidden md:flex lg:hidden flex-col items-center w-[56px] shrink-0 border-r border-base-border bg-base sticky top-14 h-[calc(100vh-56px)] py-4"
      >
        <nav className="flex-1 space-y-2" aria-label="Dashboard sections">
          {links.map(({ to, label, icon }) => (
            <SidebarLink key={to} to={to} label={label} icon={icon} isCollapsed />
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              aria-label="Dashboard navigation"
              className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-base-border bg-base md:hidden"
            >
              <div className="flex items-center justify-between border-b border-base-border p-4">
                <p className="text-body font-semibold text-text-primary">Navigation</p>
                <button
                  onClick={onClose}
                  aria-label="Close navigation"
                  className="flex h-8 w-8 items-center justify-center rounded-button text-text-secondary transition-colors duration-150 hover:bg-base-elevated hover:text-text-primary"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 space-y-1 p-4" aria-label="Dashboard sections">
                {links.map(({ to, label, icon }) => (
                  <SidebarLink key={to} to={to} label={label} icon={icon} onClick={onClose} />
                ))}
              </nav>
              <div className="mx-4 mb-4 rounded-card bg-base-elevated p-4 border border-base-border">
                <p className="text-caption font-medium text-text-primary">TradeAudit AI</p>
                <p className="text-micro text-text-muted mt-1">AI Trade Monitoring</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
