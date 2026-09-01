import axios from 'axios';

// ============================================================
// ALPACA API SERVICE (Optional - for direct calls)
// ============================================================

const API_KEY = import.meta.env.VITE_ALPACA_API_KEY;
const SECRET_KEY = import.meta.env.VITE_ALPACA_SECRET_KEY;
const PAPER_BASE_URL = 'https://paper-api.alpaca.markets';

const getHeaders = () => ({
  'APCA-API-KEY-ID': API_KEY,
  'APCA-API-SECRET-KEY': SECRET_KEY,
  'Content-Type': 'application/json'
});

export const getAccount = async () => {
  try {
    const response = await axios.get(`${PAPER_BASE_URL}/v2/account`, {
      headers: getHeaders()
    });
    console.log('✅ Alpaca Account:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error getting account:', error);
    throw error;
  }
};

export const placeOrder = async (symbol, qty, side, type = 'market', time_in_force = 'day') => {
  try {
    const response = await axios.post(
      `${PAPER_BASE_URL}/v2/orders`,
      { symbol, qty, side, type, time_in_force },
      { headers: getHeaders() }
    );
    console.log('✅ Order placed:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error placing order:', error);
    throw error;
  }
};

export const getPositions = async () => {
  try {
    const response = await axios.get(`${PAPER_BASE_URL}/v2/positions`, {
      headers: getHeaders()
    });
    console.log('✅ Positions:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error getting positions:', error);
    throw error;
  }
};

export const testConnection = async () => {
  try {
    const account = await getAccount();
    console.log('✅ Alpaca connected!');
    console.log(`📊 Account: ${account.account_number}`);
    console.log(`💰 Cash: $${account.cash}`);
    console.log(`📈 Equity: $${account.equity}`);
    return { success: true, account };
  } catch (error) {
    console.error('❌ Alpaca connection failed:', error.message);
    return { success: false, error: error.message };
  }
};