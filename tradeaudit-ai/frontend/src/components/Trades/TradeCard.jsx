import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { useTrades } from '../../context/TradeContext';
import toast from 'react-hot-toast';

export default function TradeCard({ trade }) {
  const [expanded, setExpanded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const { analyzeTrade } = useTrades();

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
    <div className="card cursor-pointer hover:shadow-md transition-shadow" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${trade.side === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
            {trade.side === 'buy' ? (
              <ArrowUpRight size={20} className="text-green-600" />
            ) : (
              <ArrowDownRight size={20} className="text-red-600" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{trade.symbol}</h3>
              <span className={`badge-${trade.risk_category || 'medium'}`}>
                {trade.risk_score || '—'}/10
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {trade.side.toUpperCase()} {trade.qty} shares
              {trade.filled_avg_price && ` @ $${trade.filled_avg_price}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium capitalize">{trade.status}</p>
            <p className="text-xs text-gray-500">{formatDate(trade.created_at)}</p>
          </div>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {trade.ai_explanation ? (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={16} className="text-blue-600" />
                <span className="font-medium text-blue-800">AI Analysis</span>
              </div>
              <p className="text-sm text-gray-700">{trade.ai_explanation}</p>
            </div>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="btn-primary flex items-center gap-2"
            >
              <Brain size={16} />
              {analyzing ? 'Analyzing...' : 'Analyze with AI'}
            </button>
          )}

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-500">Type</span>
              <p className="font-medium capitalize">{trade.order_type || '—'}</p>
            </div>
            <div>
              <span className="text-gray-500">Time in Force</span>
              <p className="font-medium uppercase">{trade.time_in_force || '—'}</p>
            </div>
            <div>
              <span className="text-gray-500">Filled At</span>
              <p className="font-medium">{formatDate(trade.filled_at)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
