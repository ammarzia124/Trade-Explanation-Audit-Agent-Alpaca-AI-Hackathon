const express = require('express');
const router = express.Router();
const alpaca = require('../services/alpaca');
const db = require('../config/database');
const aiAgent = require('../services/ai_agent');

// GET /api/portfolio
router.get('/portfolio', async (req, res) => {
  try {
    const data = await alpaca.getAccount();
    res.json(data);
  } catch (error) {
    console.error('[API] Error fetching portfolio:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders
router.get('/orders', async (req, res) => {
  try {
    const data = await alpaca.getOrders('all', 50);
    res.json(data);
  } catch (error) {
    console.error('[API] Error fetching orders:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/positions
router.get('/positions', async (req, res) => {
  try {
    const data = await alpaca.getPositions();
    res.json(data);
  } catch (error) {
    console.error('[API] Error fetching positions:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/order
router.post('/order', async (req, res) => {
  try {
    const { symbol, qty, side } = req.body;

    if (!symbol || !qty || !side) {
      return res.status(400).json({ error: 'symbol, qty, and side are required' });
    }

    const result = await alpaca.placeOrder(symbol, qty, side);
    res.json(result);
  } catch (error) {
    console.error('[API] Error placing order:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/trades
router.get('/trades', (req, res) => {
  try {
    const trades = db.getAllTrades();
    res.json(trades);
  } catch (error) {
    console.error('[API] Error fetching trades:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/explain
router.post('/explain', async (req, res) => {
  try {
    const tradeData = req.body;
    const result = await aiAgent.explainTrade(tradeData);
    res.json(result);
  } catch (error) {
    console.error('[API] Error explaining trade:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const trades = db.getAllTrades().slice(0, 20);
    const result = await aiAgent.answerQuestion(question, trades);
    res.json({ answer: result.answer });
  } catch (error) {
    console.error('[API] Error in chat:', error.message);
    res.status(500).json({ answer: 'AI is temporarily unavailable. Please try again.' });
  }
});

// GET /api/summary
router.get('/summary', (req, res) => {
  try {
    const trades = db.getAllTrades();

    const summary = {
      total: trades.length,
      filled: trades.filter(t => t.status === 'filled').length,
      blocked: trades.filter(t => t.status === 'canceled' || t.status === 'expired').length,
      highRisk: trades.filter(t => t.risk_score === 'HIGH').length,
      totalValue: trades.reduce((sum, t) => sum + (t.total || 0), 0),
    };

    res.json(summary);
  } catch (error) {
    console.error('[API] Error generating summary:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
