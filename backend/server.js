require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./src/routes/api');
const { startWebSocket } = require('./src/services/websocket');
const { initDB } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'TradeAudit AI API is running' });
});

// Start server after DB is ready
initDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
  startWebSocket();
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = app;
