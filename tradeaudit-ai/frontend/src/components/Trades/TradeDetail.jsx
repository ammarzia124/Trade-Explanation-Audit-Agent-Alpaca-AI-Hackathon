import { Brain, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function TradeDetail({ trade }) {
  if (!trade) return null;

  const isBuy = trade.side === 'buy';

  return (
    <div className="card">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-card ${
          isBuy
            ? 'bg-success-muted text-success'
            : 'bg-danger-muted text-danger'
        }`}>
          {isBuy ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
        </div>
        <div>
          <h2 className="text-heading font-semibold text-text-primary">{trade.symbol}</h2>
          <p className="text-text-secondary">
            {trade.side.toUpperCase()} {trade.qty} shares
            {trade.filled_avg_price && ` @ $${trade.filled_avg_price}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-base-elevated border border-base-border p-3.5 rounded-card">
          <p className="text-caption text-text-muted">Status</p>
          <p className="font-medium text-text-primary capitalize mt-0.5">{trade.status}</p>
        </div>
        <div className="bg-base-elevated border border-base-border p-3.5 rounded-card">
          <p className="text-caption text-text-muted">Risk Score</p>
          <p className="font-medium text-text-primary mt-0.5">{trade.risk_score || '—'}/10</p>
        </div>
        <div className="bg-base-elevated border border-base-border p-3.5 rounded-card">
          <p className="text-caption text-text-muted">Risk Category</p>
          <span className={`badge-${trade.risk_category || 'medium'} mt-1`}>
            {trade.risk_category || 'Unknown'}
          </span>
        </div>
        <div className="bg-base-elevated border border-base-border p-3.5 rounded-card">
          <p className="text-caption text-text-muted">Created</p>
          <p className="font-medium text-text-primary mt-0.5">{formatDate(trade.created_at)}</p>
        </div>
      </div>

      {trade.ai_explanation && (
        <div className="bg-accent-muted border border-accent/20 p-4 rounded-card">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={18} className="text-accent" />
            <span className="font-semibold text-accent">AI Analysis</span>
          </div>
          <p className="text-text-secondary leading-relaxed">{trade.ai_explanation}</p>
        </div>
      )}
    </div>
  );
}
