import { useState, useEffect, useCallback } from 'react';
import { getTrades } from '../lib/alpacaClient';

export function useTradesList(params = {}) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrades = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTrades(params);
      setTrades(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch trades');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => { fetchTrades(); }, [fetchTrades]);

  return { trades, loading, error, refetch: fetchTrades };
}
