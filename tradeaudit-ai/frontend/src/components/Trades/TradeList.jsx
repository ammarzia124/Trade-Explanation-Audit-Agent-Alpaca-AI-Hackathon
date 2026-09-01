import { useState } from 'react';
import { useTrades } from '../../context/TradeContext';
import TradeCard from './TradeCard';
import { Search, Filter, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TradeList() {
  const { trades, loading, fetchTrades } = useTrades();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = trades.filter(t => {
    const matchesSearch = t.symbol.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || t.risk_category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSync = async () => {
    try {
      await fetchTrades();
      toast.success('Trades synced');
    } catch {
      toast.error('Sync failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Trades</h2>
        <button onClick={handleSync} className="btn-secondary flex items-center gap-2" disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Sync
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by symbol..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="input-field w-auto"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {loading && trades.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Loading trades...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No trades found</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(trade => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      )}
    </div>
  );
}
