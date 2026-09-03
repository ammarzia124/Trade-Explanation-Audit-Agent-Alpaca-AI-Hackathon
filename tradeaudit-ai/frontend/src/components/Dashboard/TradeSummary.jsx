import { TrendingUp, TrendingDown, AlertTriangle, Activity } from 'lucide-react';
import { useTrades } from '../../context/TradeContext';

export default function TradeSummary() {
  const { trades } = useTrades();

  const stats = {
    total: trades.length,
    buys: trades.filter(t => t.side === 'buy').length,
    sells: trades.filter(t => t.side === 'sell').length,
    highRisk: trades.filter(t => t.risk_category === 'high' || t.risk_category === 'critical').length,
  };

  const cards = [
    { label: 'Total Trades', value: stats.total, icon: Activity, iconBg: 'bg-accent-muted', iconColor: 'text-accent', valueColor: 'text-text-primary' },
    { label: 'Buys', value: stats.buys, icon: TrendingUp, iconBg: 'bg-success-muted', iconColor: 'text-success', valueColor: 'text-success' },
    { label: 'Sells', value: stats.sells, icon: TrendingDown, iconBg: 'bg-danger-muted', iconColor: 'text-danger', valueColor: 'text-danger' },
    { label: 'High Risk', value: stats.highRisk, icon: AlertTriangle, iconBg: 'bg-warning-muted', iconColor: 'text-warning', valueColor: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="status" aria-live="polite">
      {cards.map(({ label, value, icon: Icon, iconBg, iconColor, valueColor }) => (
        <article key={label} className="card group">
          <div className="flex items-center justify-between">
            <div>
              <p className="caption text-text-muted mb-1">{label}</p>
              <p className={`stat-number ${valueColor}`}>{value}</p>
            </div>
            <div className={`${iconBg} p-3 rounded-card transition-transform duration-200 group-hover:scale-110`}>
              <Icon size={22} className={iconColor} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
