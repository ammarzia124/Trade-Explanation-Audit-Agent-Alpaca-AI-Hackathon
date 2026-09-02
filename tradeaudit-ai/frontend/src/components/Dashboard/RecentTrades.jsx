import { useTrades } from '../../context/TradeContext';
import { formatDate } from '../../utils/helpers';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function RecentTrades() {
  const { trades } = useTrades();
  const recent = trades.slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
        <p className="text-gray-500 text-center py-8">No trades yet</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
      <div className="space-y-3">
        {recent.map(trade => (
          <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${trade.side === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
                {trade.side === 'buy' ? (
                  <ArrowUpRight size={16} className="text-green-600" />
                ) : (
                  <ArrowDownRight size={16} className="text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium">{trade.symbol}</p>
                <p className="text-sm text-gray-500">
                  {trade.side.toUpperCase()} {trade.qty} @ ${trade.filled_avg_price || '—'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`badge-${trade.risk_category || 'medium'}`}>
                {trade.risk_score || '—'}/10
              </span>
              <p className="text-xs text-gray-500 mt-1">{formatDate(trade.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
