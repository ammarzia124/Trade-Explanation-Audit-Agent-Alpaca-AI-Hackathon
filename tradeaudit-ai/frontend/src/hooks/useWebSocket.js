import { useState, useEffect, useRef } from 'react';
import { useTrades } from '../context/TradeContext';

export function useWebSocket() {
  const wsRef = useRef(null);
  const { setWsConnected, fetchTrades } = useTrades();

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/trades`;

    const connect = () => {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setWsConnected(true);
        ws.send(JSON.stringify({ type: 'subscribe_trades', symbols: ['*'] }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'order_update') {
          fetchTrades();
        }
      };

      ws.onclose = () => {
        setWsConnected(false);
        setTimeout(connect, 5000);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  return wsRef;
}
