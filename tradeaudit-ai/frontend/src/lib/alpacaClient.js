import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.response?.data?.answer ||
      error.message ||
      'Unknown API error';

    console.error(`[alpacaClient] ${error.config?.url}:`, message);

    return Promise.reject(new Error(message));
  }
);

export async function getPortfolio() {
  const { data } = await client.get('/portfolio');
  return data;
}

export async function getPositions() {
  const { data } = await client.get('/positions');
  return Array.isArray(data) ? data : [];
}

export async function getOrders() {
  const { data } = await client.get('/orders');
  return Array.isArray(data) ? data : [];
}

export async function getTrades(params) {
  const { data } = await client.get('/trades', { params });
  return data.trades || data || [];
}

export async function getSummary() {
  const { data } = await client.get('/summary');
  return data;
}

export async function getAuditLogs(params) {
  const { data } = await client.get('/audit', { params });
  return data.logs || [];
}

export async function analyzeTrade(tradeId) {
  const { data } = await client.post(`/trades/${tradeId}/analyze`);
  return data;
}

export async function sendChat(question) {
  const { data } = await client.post('/chat', { question });
  return data;
}

export async function createAuditLog(logData) {
  const { data } = await client.post('/audit', logData);
  return data.log;
}

export default client;
