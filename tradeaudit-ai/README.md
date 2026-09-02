# TradeAudit AI

An AI agent that connects to Alpaca Paper Trading API, fetches live trades, explains each trade using Claude AI in plain English, scores risk level, saves audit logs, and lets users ask natural language questions about their trades.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Frontend | React 18 + Vite + Tailwind CSS + Recharts |
| Mobile | Flutter 3 |
| Database | SQLite (better-sqlite3) |
| AI | Anthropic Claude Sonnet |
| Trading | Alpaca Paper Trading API + WebSocket |

## Project Structure

```
tradeaudit-ai/
├── backend/          # Express REST API
├── frontend/         # React SPA dashboard
├── mobile/           # Flutter mobile app
├── .env.example      # Environment variables template
└── render.yaml       # Render.com deployment config
```

## Prerequisites

- **Node.js** v18+ and npm
- **Flutter SDK** v3+ (for mobile)
- **Alpaca Paper Trading** account — [Sign up](https://app.alpaca.markets/paper/overview/keys)
- **Anthropic API key** — [Get one](https://console.anthropic.com/)

## Environment Setup

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd tradeaudit-ai
   ```

2. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Fill in your API keys in `.env`:
   ```
   ALPACA_API_KEY=your_key
   ALPACA_SECRET_KEY=your_secret
   ANTHROPIC_API_KEY=your_key
   ```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:5000` by default.

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/trades | Fetch all trades from Alpaca |
| GET | /api/trades/:id | Get trade details with AI analysis |
| POST | /api/audit | Save audit log |
| GET | /api/audit | Get all audit logs |
| POST | /api/chat | Ask natural language questions about trades |
| GET | /api/alpaca/account | Get Alpaca account info |
| WS | /ws/trades | Live trade updates via WebSocket |

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The dashboard runs at `http://localhost:5173` by default.

## Mobile Setup

```bash
cd mobile
flutter pub get
flutter run
```

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Deployment (Render)

1. Push to GitHub
2. Connect repo to [Render](https://render.com)
3. Render reads `render.yaml` and provisions:
   - Backend web service on port 5000
   - Frontend static site
4. Set environment variables in Render dashboard

## How It Works

1. **Connect** — Backend authenticates with Alpaca Paper Trading API
2. **Fetch** — Pulls live and historical trades via REST + WebSocket
3. **Analyze** — Claude AI explains each trade in plain English and assigns a risk score (1-10)
4. **Store** — Trade data and audit logs saved to SQLite
5. **Query** — Users ask questions like "What were my riskiest trades this week?" and get natural language answers

## License

MIT
