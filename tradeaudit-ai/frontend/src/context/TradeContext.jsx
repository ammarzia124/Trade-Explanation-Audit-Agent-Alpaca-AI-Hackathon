import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getTrades, getAuditLogs, analyzeTrade, sendChat as apiSendChat, createAuditLog as apiCreateAuditLog } from '../lib/alpacaClient';

const TradeContext = createContext();

function transformTrade(t) {
  const riskCategory = String(t.risk_score || 'MEDIUM').toLowerCase();
  return {
    ...t,
    filled_avg_price: t.filled_avg_price || t.price,
    risk_category: riskCategory,
    created_at: t.created_at || t.timestamp,
    order_type: t.order_type || 'market',
    time_in_force: t.time_in_force || 'day',
    filled_at: t.filled_at || t.timestamp,
  };
}

export function useTrades() {
  const context = useContext(TradeContext);
  if (!context) throw new Error('useTrades must be used within TradeProvider');
  return context;
}

export function TradeProvider({ children }) {
  const [trades, setTrades] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  const fetchTrades = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const raw = await getTrades(params);
      setTrades(Array.isArray(raw) ? raw.map(transformTrade) : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch trades');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditLogs = useCallback(async (params = {}) => {
    try {
      const logs = await getAuditLogs(params);
      setAuditLogs(logs);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    }
  }, []);

  const handleAnalyzeTrade = useCallback(async (tradeId) => {
    const result = await analyzeTrade(tradeId);
    setTrades((prev) =>
      prev.map((t) => (t.id === tradeId ? transformTrade(result.trade) : t))
    );
    return result.analysis;
  }, []);

  const sendChat = useCallback(async (message) => {
    return apiSendChat(message);
  }, []);

  const createAuditLog = useCallback(async (logData) => {
    const log = await apiCreateAuditLog(logData);
    setAuditLogs((prev) => [log, ...prev]);
    return log;
  }, []);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  const value = {
    trades,
    auditLogs,
    loading,
    error,
    wsConnected,
    setWsConnected,
    fetchTrades,
    fetchAuditLogs,
    analyzeTrade: handleAnalyzeTrade,
    sendChat,
    createAuditLog,
  };

  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
}
