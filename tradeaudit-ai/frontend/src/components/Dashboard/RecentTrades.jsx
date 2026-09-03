import { useTrades } from '../../context/TradeContext';
import { formatDate } from '../../utils/helpers';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function RecentTrades() {
  const { trades } = useTrades();
  const recent = trades.slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="card">
        <h3 className="section-title mb-4">Recent Trades</h3>
        <p className="text-text-secondary text-center py-12">No trades yet</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="section-title mb-4">Recent Trades</h3>
      <div className="space-y-2">
        {recent.map(trade => (
          <div
            key={trade.id}
            className="flex items-center justify-between p-3 rounded-card bg-base-elevated border border-base-border hover:bg-base-border/30 transition-colors duration-150"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-card ${
                trade.side === 'buy'
                  ? 'bg-success-muted text-success'
                  : 'bg-danger-muted text-danger'
              }`}>
                {trade.side === 'buy' ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
              </div>
              <div>
                <p className="font-medium text-text-primary">{trade.symbol}</p>
                <p className="text-caption text-text-secondary">
                  {trade.side.toUpperCase()} {trade.qty} @ ${trade.filled_avg_price || '—'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`badge-${trade.risk_category || 'medium'}`}>
                {trade.risk_score || '—'}/10
              </span>
              <p className="text-micro text-text-muted mt-1">{formatDate(trade.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
