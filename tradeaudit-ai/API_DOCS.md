# TradeAudit AI — API Documentation

**Base URL:** `http://localhost:5000`

All endpoints are prefixed with `/api`. Responses are JSON. On error, every endpoint returns `{ "error": "message" }` with an appropriate HTTP status code.

---

## Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Get Alpaca account info |
| GET | `/api/orders` | Get last 50 orders |
| GET | `/api/positions` | Get open positions |
| POST | `/api/order` | Place a paper trade |
| GET | `/api/trades` | Get all saved trades |
| POST | `/api/explain` | Get AI explanation for a trade |
| POST | `/api/chat` | Ask a question about your trades |
| GET | `/api/summary` | Get today's trading summary |

---

## 1. GET /api/portfolio

Get your Alpaca paper trading account details.

**Request:**
```
GET /api/portfolio
```

**Success Response (200):**
```json
{
  "equity": "50000.00",
  "buying_power": "100000.00",
  "cash": "50000.00",
  "portfolio_value": "50000.00",
  "status": "ACTIVE",
  "account_id": "b3a6e3e1-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "currency": "USD",
  "daytrade_count": 0,
  "pattern_day_trader": false,
  "trading_blocked": false,
  "account_blocked": false,
  "created_at": "2024-01-15T10:30:00Z",
  "cross_margin_mode": "cross_margin"
}
```

**Error Response (500):**
```json
{
  "error": "Alpaca API error: 401 Unauthorized"
}
```

---

## 2. GET /api/orders

Get the last 50 orders from your Alpaca account.

**Request:**
```
GET /api/orders
```

**Success Response (200):**
```json
{
  "orders": [
    {
      "id": "c3a6e3e1-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "symbol": "AAPL",
      "side": "buy",
      "qty": "10",
      "type": "market",
      "status": "filled",
      "filled_avg_price": "200.00",
      "time_in_force": "day",
      "submitted_at": "2024-06-15T14:30:00Z",
      "filled_at": "2024-06-15T14:30:01Z"
    }
  ],
  "count": 1
}
```

**Error Response (500):**
```json
{
  "error": "Alpaca API error: 500 Internal Server Error"
}
```

---

## 3. GET /api/positions

Get all open positions in your portfolio.

**Request:**
```
GET /api/positions
```

**Success Response (200):**
```json
{
  "positions": [
    {
      "symbol": "AAPL",
      "qty": "10",
      "avg_entry_price": "198.50",
      "current_price": "201.00",
      "unrealized_pl": "25.00",
      "unrealized_plpc": "0.0126",
      "market_value": "2010.00"
    }
  ],
  "count": 1
}
```

**Error Response (500):**
```json
{
  "error": "Alpaca API error: 502 Bad Gateway"
}
```

---

## 4. POST /api/order

Place a new paper trade order.

**Request:**
```
POST /api/order
Content-Type: application/json

{
  "symbol": "AAPL",
  "qty": 10,
  "side": "buy"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `symbol` | string | Yes | Stock ticker (e.g., `"AAPL"`) |
| `qty` | number | Yes | Number of shares |
| `side` | string | Yes | `"buy"` or `"sell"` |

**Success Response (200):**
```json
{
  "order": {
    "id": "c3a6e3e1-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "symbol": "AAPL",
    "side": "buy",
    "qty": "10",
    "type": "market",
    "status": "new",
    "time_in_force": "day",
    "submitted_at": "2024-06-15T14:30:00Z"
  },
  "message": "Order placed and saved to database"
}
```

**Error Response (400 — missing fields):**
```json
{
  "error": "symbol, qty, and side are required"
}
```

**Error Response (500 — Alpaca rejected):**
```json
{
  "error": "Alpaca API error: 422 - {\"message\":\"symbol is required\"}"
}
```

---

## 5. GET /api/trades

Get all trades saved in the local SQLite database (includes AI explanations).

**Request:**
```
GET /api/trades
```

**Success Response (200):**
```json
{
  "trades": [
    {
      "id": 1,
      "symbol": "AAPL",
      "side": "buy",
      "qty": 10,
      "price": 200.00,
      "total": 2000.00,
      "status": "filled",
      "strategy": null,
      "risk_score": "LOW",
      "ai_explanation": "A buy order for 10 shares of AAPL was filled at $200.00. This trade represents a standard equity position increase. Risk level is LOW given the portfolio context.",
      "portfolio_value": 50000.00,
      "timestamp": "2024-06-15T14:30:01Z",
      "order_id": "c3a6e3e1-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  ],
  "count": 1
}
```

**Error Response (500):**
```json
{
  "error": "database is locked"
}
```

---

## 6. POST /api/explain

Get an AI-generated explanation and risk score for a trade.

**Request:**
```
POST /api/explain
Content-Type: application/json

{
  "symbol": "AAPL",
  "side": "buy",
  "qty": 10,
  "price": 200.00,
  "total": 2000.00,
  "status": "filled",
  "portfolioValue": 50000.00
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `symbol` | string | Yes | Stock ticker |
| `side` | string | Yes | `"buy"` or `"sell"` |
| `qty` | number | No | Number of shares |
| `price` | number | No | Average fill price |
| `total` | number | No | Total trade value |
| `status` | string | No | Order status |
| `portfolioValue` | number | No | Current portfolio value (used for risk calculation) |

**Success Response (200):**
```json
{
  "explanation": "A buy order for 10 shares of AAPL was filled at $200.00 totaling $2000.00. This trade likely represents a portfolio rebalancing or a bullish position on Apple based on recent market trends. Risk level is LOW as this represents only 4% of the total portfolio value.",
  "riskScore": "LOW"
}
```

**Error Response (400 — missing fields):**
```json
{
  "error": "symbol and side are required"
}
```

**Error Response (500):**
```json
{
  "error": "Claude API error: rate limit exceeded"
}
```

---

## 7. POST /api/chat

Ask a natural language question about your trades and get an AI-powered answer.

**Request:**
```
POST /api/chat
Content-Type: application/json

{
  "question": "What were my riskiest trades this week?"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | Yes | Your question about trading activity |

**Success Response (200):**
```json
{
  "answer": "Your riskiest trade this week was a sell order for 50 shares of TSLA at $250.00, which represented 25% of your portfolio. All other trades were within normal risk parameters.",
  "trades_count": 12
}
```

**Error Response (400 — missing question):**
```json
{
  "error": "question is required"
}
```

**Error Response (500):**
```json
{
  "error": "Claude API error: invalid api key"
}
```

---

## 8. GET /api/summary

Get a summary of today's trading activity.

**Request:**
```
GET /api/summary
```

**Success Response (200):**
```json
{
  "date": "2024-06-15",
  "total_trades_today": 5,
  "total_volume_today": 12500.00,
  "blocked_trades": 0,
  "filled_trades": 4,
  "pending_trades": 1,
  "buy_orders": 3,
  "sell_orders": 2
}
```

**Error Response (500):**
```json
{
  "error": "database is locked"
}
```

---

## Common Patterns

**Base URL for all requests:**
```
http://localhost:5000/api
```

**Content-Type for POST requests:**
```
Content-Type: application/json
```

**Error handling:**
- `400` — Missing required fields (check `error` message)
- `500` — Server or external API error (Alpaca, Claude AI, database)

**Data types:**
- Prices and totals are numbers (not strings)
- Quantities from Alpaca come as strings; the backend converts them to numbers
- Timestamps are ISO 8601 strings

**Quick start for React:**
```js
// Example: Fetch portfolio
const res = await fetch('http://localhost:5000/api/portfolio');
const data = await res.json();
console.log(data.equity); // "50000.00"

// Example: Place an order
const res = await fetch('http://localhost:5000/api/order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ symbol: 'AAPL', qty: 10, side: 'buy' }),
});
const data = await res.json();
console.log(data.order.id); // order ID
```
