const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../../trades.db');
let db;

async function initDB() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS trades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT UNIQUE,
      symbol TEXT,
      side TEXT,
      qty REAL,
      price REAL,
      total REAL,
      status TEXT,
      risk_score TEXT,
      ai_explanation TEXT,
      portfolio_value REAL,
      timestamp TEXT
    )
  `);

  saveDB();
  console.log('[DB] Database initialized with trades table');
}

function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function insertTrade(trade) {
  db.run(`
    INSERT OR IGNORE INTO trades
    (order_id, symbol, side, qty, price, total, status, risk_score, ai_explanation, portfolio_value, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    trade.order_id,
    trade.symbol,
    trade.side,
    trade.qty,
    trade.price,
    trade.total,
    trade.status,
    trade.risk_score || null,
    trade.ai_explanation || null,
    trade.portfolio_value || null,
    trade.timestamp || new Date().toISOString()
  ]);

  const result = db.exec('SELECT last_insert_rowid() as id');
  const id = result[0]?.values[0][0];
  saveDB();
  console.log(`[DB] Trade inserted: ${trade.symbol} ${trade.side} ${trade.qty} (order: ${trade.order_id})`);
  return id;
}

function getAllTrades() {
  const results = db.exec('SELECT * FROM trades ORDER BY timestamp DESC');
  if (!results.length) return [];
  const columns = results[0].columns;
  const trades = results[0].values.map(row => {
    const obj = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
  console.log(`[DB] Retrieved ${trades.length} trades`);
  return trades;
}

function getTradeByOrderId(orderId) {
  const results = db.exec('SELECT * FROM trades WHERE order_id = ?', [orderId]);
  if (!results.length || !results[0].values.length) return null;
  const columns = results[0].columns;
  const row = results[0].values[0];
  const obj = {};
  columns.forEach((col, i) => { obj[col] = row[i]; });
  return obj;
}

module.exports = { initDB, insertTrade, getAllTrades, getTradeByOrderId };
