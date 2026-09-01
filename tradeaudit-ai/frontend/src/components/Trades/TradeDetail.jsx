import { Brain, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function TradeDetail({ trade }) {
  if (!trade) return null;

  return (
    <div className="card">
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-full ${trade.side === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
          {trade.side === 'buy' ? (
            <ArrowUpRight size={24} className="text-green-600" />
          ) : (
            <ArrowDownRight size={24} className="text-red-600" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{trade.symbol}</h2>
          <p className="text-gray-500">
            {trade.side.toUpperCase()} {trade.qty} shares
            {trade.filled_avg_price && ` @ $${trade.filled_avg_price}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-medium capitalize">{trade.status}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Risk Score</p>
          <p className="font-medium">{trade.risk_score || '—'}/10</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Risk Category</p>
          <span className={`badge-${trade.risk_category || 'medium'}`}>
            {trade.risk_category || 'Unknown'}
          </span>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Created</p>
          <p className="font-medium">{formatDate(trade.created_at)}</p>
        </div>
      </div>

      {trade.ai_explanation && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={18} className="text-blue-600" />
            <span className="font-semibold text-blue-800">AI Analysis</span>
          </div>
          <p className="text-gray-700">{trade.ai_explanation}</p>
        </div>
      )}
    </div>
  );
}
