const request = require('supertest');
const express = require('express');
const tradeRoutes = require('../src/routes/trades');

const app = express();
app.use(express.json());
app.use('/api/trades', tradeRoutes);

describe('Trade Routes', () => {
  describe('GET /api/trades', () => {
    it('should return trades array', async () => {
      const res = await request(app).get('/api/trades');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('trades');
      expect(Array.isArray(res.body.trades)).toBe(true);
    });
  });

  describe('POST /api/trades/:id/analyze', () => {
    it('should return 404 for non-existent trade', async () => {
      const res = await request(app).post('/api/trades/nonexistent/analyze');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
