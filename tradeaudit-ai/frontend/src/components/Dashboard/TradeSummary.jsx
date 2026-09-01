import { TrendingUp, TrendingDown, AlertTriangle, Activity } from 'lucide-react';
import { useTrades } from '../../context/TradeContext';

export default function TradeSummary() {
  const { trades, account } = useTrades();

  const stats = {
    total: trades.length,
    buys: trades.filter(t => t.side === 'buy').length,
    sells: trades.filter(t => t.side === 'sell').length,
    highRisk: trades.filter(t => t.risk_category === 'high' || t.risk_category === 'critical').length,
    avgRisk: trades.length > 0
      ? (trades.reduce((sum, t) => sum + (t.risk_score || 0), 0) / trades.length).toFixed(1)
      : '—',
  };

  const cards = [
    { label: 'Total Trades', value: stats.total, icon: Activity, color: 'text-primary-600' },
    { label: 'Buys', value: stats.buys, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Sells', value: stats.sells, icon: TrendingDown, color: 'text-red-600' },
    { label: 'High Risk', value: stats.highRisk, icon: AlertTriangle, color: 'text-orange-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <Icon size={24} className={color} />
          </div>
        </div>
      ))}
    </div>
  );
}
