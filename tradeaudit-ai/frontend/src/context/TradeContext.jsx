import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api';

const TradeContext = createContext();

export function useTrades() {
  const context = useContext(TradeContext);
  if (!context) throw new Error('useTrades must be used within TradeProvider');
  return context;
}

export function TradeProvider({ children }) {
  const [trades, setTrades] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  const fetchTrades = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/trades', { params });
      setTrades(data.trades);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch trades');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditLogs = useCallback(async (params = {}) => {
    try {
      const { data } = await api.get('/audit', { params });
      setAuditLogs(data.logs);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    }
  }, []);

  const fetchAccount = useCallback(async () => {
    try {
      const { data } = await api.get('/alpaca/account');
      setAccount(data.account);
    } catch (err) {
      console.error('Failed to fetch account:', err);
    }
  }, []);

  const analyzeTrade = useCallback(async (tradeId) => {
    try {
      const { data } = await api.post(`/trades/${tradeId}/analyze`);
      setTrades(prev => prev.map(t => t.id === tradeId ? data.trade : t));
      return data.analysis;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Analysis failed');
    }
  }, []);

  const sendChat = useCallback(async (message) => {
    const { data } = await api.post('/chat', { message });
    return data;
  }, []);

  const createAuditLog = useCallback(async (logData) => {
    const { data } = await api.post('/audit', logData);
    setAuditLogs(prev => [data.log, ...prev]);
    return data.log;
  }, []);

  useEffect(() => {
    fetchTrades();
    fetchAccount();
  }, [fetchTrades, fetchAccount]);

  const value = {
    trades, auditLogs, account, loading, error, wsConnected,
    setWsConnected,
    fetchTrades, fetchAuditLogs, fetchAccount,
    analyzeTrade, sendChat, createAuditLog,
  };

  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
}
