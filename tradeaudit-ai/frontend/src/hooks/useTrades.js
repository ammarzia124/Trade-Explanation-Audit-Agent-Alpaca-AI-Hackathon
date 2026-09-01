import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export function useTradesList(params = {}) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrades = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/trades', { params });
      setTrades(data.trades);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch trades');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTrades(); }, [fetchTrades]);

  return { trades, loading, error, refetch: fetchTrades };
}
