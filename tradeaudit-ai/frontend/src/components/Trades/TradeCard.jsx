import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Brain, ChevronDown } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { useTrades } from '../../context/TradeContext';
import toast from 'react-hot-toast';

export default function TradeCard({ trade }) {
  const [expanded, setExpanded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const { analyzeTrade } = useTrades();

  const isBuy = trade.side === 'buy';

  const handleAnalyze = async (e) => {
    e.stopPropagation();
    setAnalyzing(true);
    try {
      await analyzeTrade(trade.id);
      toast.success('Trade analyzed');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div
      className="card-interactive"
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`${trade.side} ${trade.symbol} - ${trade.status}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-card transition-transform duration-200 group-hover:scale-110 ${
            isBuy
              ? 'bg-success-muted text-success'
              : 'bg-danger-muted text-danger'
          }`}>
            {isBuy ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-semibold text-body text-text-primary">{trade.symbol}</h3>
              <span className={`badge-${trade.risk_category || 'medium'}`}>
                {trade.risk_score || '—'}/10
              </span>
            </div>
            <p className="text-caption text-text-secondary mt-0.5">
              {trade.side.toUpperCase()} {trade.qty} shares
              {trade.filled_avg_price && ` @ $${trade.filled_avg_price}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-caption font-medium text-text-primary capitalize">{trade.status}</p>
            <p className="text-micro text-text-muted">{formatDate(trade.created_at)}</p>
          </div>
          <div className="text-text-muted transition-transform duration-200" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-base-border">
          {trade.ai_explanation ? (
            <div className="bg-accent-muted border border-accent/20 p-4 rounded-card">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={16} className="text-accent" />
                <span className="font-medium text-accent">AI Analysis</span>
              </div>
              <p className="text-caption text-text-secondary leading-relaxed">{trade.ai_explanation}</p>
            </div>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="btn-primary"
            >
              <Brain size={16} />
              {analyzing ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          )}

          <div className="grid grid-cols-3 gap-4 mt-4 text-caption">
            <div>
              <span className="text-text-muted">Type</span>
              <p className="font-medium text-text-primary capitalize mt-0.5">{trade.order_type || '—'}</p>
            </div>
            <div>
              <span className="text-text-muted">Time in Force</span>
              <p className="font-medium text-text-primary uppercase mt-0.5">{trade.time_in_force || '—'}</p>
            </div>
            <div>
              <span className="text-text-muted">Filled At</span>
              <p className="font-medium text-text-primary mt-0.5">{formatDate(trade.filled_at)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
