const fetch = require('node-fetch');

const ALPACA_BASE_URL = process.env.ALPACA_BASE_URL || 'https://paper-api.alpaca.markets';
const ALPACA_API_KEY = process.env.ALPACA_API_KEY;
const ALPACA_SECRET_KEY = process.env.ALPACA_SECRET_KEY;

function getHeaders() {
  return {
    'APCA-API-KEY-ID': ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': ALPACA_SECRET_KEY,
  };
}

// GET /v2/account
async function getAccount() {
  console.log('[Alpaca] Fetching account data...');
  const res = await fetch(`${ALPACA_BASE_URL}/v2/account`, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Alpaca API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  console.log('[Alpaca] Account fetched successfully');
  return data;
}

// GET /v2/orders
async function getOrders(status = 'all', limit = 50) {
  console.log(`[Alpaca] Fetching orders (status=${status}, limit=${limit})...`);
  const res = await fetch(
    `${ALPACA_BASE_URL}/v2/orders?status=${status}&limit=${limit}`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error(`Alpaca API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  console.log(`[Alpaca] Fetched ${data.length} orders`);
  return data;
}

// GET /v2/positions
async function getPositions() {
  console.log('[Alpaca] Fetching positions...');
  const res = await fetch(`${ALPACA_BASE_URL}/v2/positions`, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Alpaca API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  console.log(`[Alpaca] Fetched ${data.length} positions`);
  return data;
}

// POST /v2/orders
async function placeOrder(symbol, qty, side, type = 'market', time_in_force = 'day') {
  console.log(`[Alpaca] Placing order: ${side} ${qty} ${symbol} (${type})...`);
  const res = await fetch(`${ALPACA_BASE_URL}/v2/orders`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ symbol, qty, side, type, time_in_force }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Alpaca API error: ${res.status} - ${errorBody}`);
  }
  const data = await res.json();
  console.log(`[Alpaca] Order placed: ${data.id}`);
  return data;
}

module.exports = { getAccount, getOrders, getPositions, placeOrder };
