import { useState } from 'react';
import { useTrades } from '../../context/TradeContext';
import TradeCard from './TradeCard';
import { Search, RefreshCw } from 'lucide-react';
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
        <div>
          <h2 className="section-title">Trades</h2>
          <p className="section-subtitle">View and analyze your trading history</p>
        </div>
        <button onClick={handleSync} className="btn-primary" disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Sync
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6" role="search" aria-label="Filter trades">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <label htmlFor="trade-search" className="sr-only">Search trades</label>
          <input
            id="trade-search"
            type="text"
            placeholder="Search by symbol..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <label htmlFor="risk-filter" className="sr-only">Filter by risk level</label>
        <select
          id="risk-filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="input sm:w-auto sm:min-w-[160px]"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="px-1 py-2 text-micro text-text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'trade' : 'trades'} found
      </div>

      {loading && trades.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 skeleton rounded-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-text-muted">No trades found</div>
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
