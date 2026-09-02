const WebSocket = require('ws');
const { explainTrade } = require('./ai_agent');
const { insertTrade } = require('../config/database');

const ALPACA_WS_URL = 'wss://paper-api.alpaca.markets/stream';
const ALPACA_API_KEY = process.env.ALPACA_API_KEY;
const ALPACA_SECRET_KEY = process.env.ALPACA_SECRET_KEY;

let ws = null;
let reconnectTimeout = null;

function connect() {
  console.log('[WS] Connecting to Alpaca Paper Trading WebSocket...');

  ws = new WebSocket(ALPACA_WS_URL);

  ws.on('open', () => {
    console.log('[WS] Connected! Authenticating...');
    ws.send(JSON.stringify({
      action: 'auth',
      key: ALPACA_API_KEY,
      secret: ALPACA_SECRET_KEY,
    }));
  });

  ws.on('message', async (raw) => {
    try {
      const messages = JSON.parse(raw);

      for (const msg of messages) {
        if (msg.type === 'listen') {
          if (msg.error) {
            console.error('[WS] Auth failed:', msg.error);
            ws.close();
            return;
          }
          console.log('[WS] Authenticated! Subscribing to trade_updates...');
          ws.send(JSON.stringify({ action: 'subscribe', trade_updates: ['*'] }));
          continue;
        }

        if (msg.type === 'trade_updates') {
          const event = msg.data.event;
          console.log(`[WS] Trade event: ${event}`);

          if (event === 'fill' || event === 'partial_fill') {
            await handleTradeFill(msg.data);
          }
        }
      }
    } catch (err) {
      console.error('[WS] Error processing message:', err.message);
    }
  });

  ws.on('close', () => {
    console.log('[WS] Connection closed. Reconnecting in 5 seconds...');
    reconnectTimeout = setTimeout(connect, 5000);
  });

  ws.on('error', (err) => {
    console.error('[WS] Error:', err.message);
    ws.close();
  });
}

async function handleTradeFill(data) {
  const order = data.order;
  const filledQty = parseFloat(data.filled_qty);
  const filledAvgPrice = parseFloat(data.filled_avg_price);
  const total = filledQty * filledAvgPrice;

  console.log(`[WS] Fill detected: ${order.side} ${filledQty} ${order.symbol} @ $${filledAvgPrice}`);

  const { explanation, riskScore } = await explainTrade({
    symbol: order.symbol,
    side: order.side,
    qty: filledQty,
    price: filledAvgPrice,
    total,
    status: data.event,
  });

  insertTrade({
    order_id: order.id,
    symbol: order.symbol,
    side: order.side,
    qty: filledQty,
    price: filledAvgPrice,
    total,
    status: data.event,
    risk_score: riskScore,
    ai_explanation: explanation,
  });

  console.log(`[WS] Trade saved: ${order.side.toUpperCase()} ${order.symbol} ${filledQty} @ $${filledAvgPrice} — Risk: ${riskScore}`);
}

function startWebSocket() {
  if (!ALPACA_API_KEY || !ALPACA_SECRET_KEY) {
    console.error('[WS] Missing ALPACA_API_KEY or ALPACA_SECRET_KEY in environment');
    return;
  }
  connect();
}

module.exports = { startWebSocket };
