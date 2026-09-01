// ============================================================
// MOCK DATA - DAY 1 (UPDATED WITH MORE RESPONSES)
// ============================================================

export const mockResponses = {
  // ============================================================
  // AAPL RELATED
  // ============================================================
  "aapl": {
    answer: "AAPL was purchased to increase Technology sector allocation which was below the target. The trade of $2,000 represented 4% of portfolio — classified LOW risk.",
    trade: {
      symbol: 'AAPL',
      action: 'BUY',
      amount: 2000,
      risk: 'LOW',
      explanation: 'Increase Technology sector allocation'
    }
  },
  
  // ============================================================
  // RISKY TRADES
  // ============================================================
  "risky": {
    answer: "1 high-risk trade today: NVDA BUY $7,000. It was blocked because it exceeded the 15% maximum position limit.",
    trade: {
      symbol: 'NVDA',
      action: 'BLOCKED',
      amount: 7000,
      risk: 'HIGH',
      explanation: 'Exceeded 15% position limit'
    }
  },
  
  // ============================================================
  // LAST TRADE
  // ============================================================
  "last": {
    answer: "Last trade was AAPL BUY $2,000 at 10:02 AM. It was a LOW risk trade representing 4% of portfolio.",
    trade: {
      symbol: 'AAPL',
      action: 'BUY',
      amount: 2000,
      risk: 'LOW',
      explanation: 'Last trade executed at 10:02 AM'
    }
  },
  
  // ============================================================
  // TODAY'S TRADES
  // ============================================================
  "trades": {
    answer: "Today's trades: AAPL BUY $2,000 (LOW risk), TSLA SELL $1,500 (MEDIUM risk), NVDA BUY $7,000 (BLOCKED - HIGH risk).",
    trade: null
  },
  
  // ============================================================
  // TOTAL VOLUME
  // ============================================================
  "volume": {
    answer: "Total trading volume today was $11,500 across 7 trades. 6 were filled successfully, 1 was blocked.",
    trade: null
  },
  
  // ============================================================
  // TSLA RELATED
  // ============================================================
  "tsla": {
    answer: "TSLA was sold to reduce overweight position in the portfolio. The trade of $1,500 represented 3% of portfolio — classified MEDIUM risk.",
    trade: {
      symbol: 'TSLA',
      action: 'SELL',
      amount: 1500,
      risk: 'MEDIUM',
      explanation: 'Reduce overweight position'
    }
  },
  
  // ============================================================
  // NVDA RELATED
  // ============================================================
  "nvda": {
    answer: "NVDA trade was BLOCKED because it would have exceeded the 15% maximum position limit. The trade would have been $7,000 — classified HIGH risk.",
    trade: {
      symbol: 'NVDA',
      action: 'BLOCKED',
      amount: 7000,
      risk: 'HIGH',
      explanation: 'Exceeded 15% position limit'
    }
  },
  
  // ============================================================
  // PORTFOLIO
  // ============================================================
  "portfolio": {
    answer: "Your portfolio is currently worth $25,430. You have 7 open positions. The largest holding is AAPL at 15% of total portfolio.",
    trade: null
  },
  
  // ============================================================
  // RISK EXPLANATION
  // ============================================================
  "risk explanation": {
    answer: "Risk is calculated based on trade size as percentage of total portfolio: LOW (<5%), MEDIUM (5-15%), HIGH (>15%). Today's average risk level is LOW.",
    trade: null
  },
  
  // ============================================================
  // WHAT HAPPENED AT 10AM
  // ============================================================
  "10am": {
    answer: "At 10:02 AM, AAPL was purchased for $2,000. At 10:15 AM, TSLA was sold for $1,500. At 10:22 AM, NVDA buy was blocked.",
    trade: null
  },
  
  // ============================================================
  // DEFAULT RESPONSE
  // ============================================================
  "default": {
    answer: "I don't have enough information about that. Try asking about trades, risk, or portfolio.",
    trade: null
  }
};

// ============================================================
// MOCK RESPONSE LOOKUP
// ============================================================

export const getMockResponse = (question) => {
  const lower = question.toLowerCase();
  
  // Check for specific questions first
  if (lower.includes('10am') || lower.includes('10:00') || lower.includes('10 am')) {
    return mockResponses["10am"];
  }
  
  // Check for risk explanation
  if (lower.includes('risk explanation') || lower.includes('how is risk calculated')) {
    return mockResponses["risk explanation"];
  }
  
  // Check for portfolio
  if (lower.includes('portfolio') || lower.includes('total value') || lower.includes('worth')) {
    return mockResponses["portfolio"];
  }
  
  // Check for specific stocks
  if (lower.includes('tsla') || lower.includes('tesla')) {
    return mockResponses.tsla;
  }
  
  if (lower.includes('nvda') || lower.includes('nvidia')) {
    return mockResponses.nvda;
  }
  
  if (lower.includes('aapl') || lower.includes('apple')) {
    return mockResponses.aapl;
  }
  
  // Check for risky trades
  if (lower.includes('risky') || lower.includes('risk') || lower.includes('high')) {
    return mockResponses.risky;
  }
  
  // Check for last trade
  if (lower.includes('last trade') || lower.includes('explain')) {
    return mockResponses.last;
  }
  
  // Check for volume
  if (lower.includes('volume') || lower.includes('total')) {
    return mockResponses.volume;
  }
  
  // Check for today's trades
  if (lower.includes('today') || lower.includes('trades') || lower.includes('show me')) {
    return mockResponses.trades;
  }
  
  // Default
  return mockResponses.default;
};

// ============================================================
// SUGGESTED QUESTIONS
// ============================================================

export const suggestedQuestions = [
  { label: "📊 Today's trades", question: "Show today's trades" },
  { label: "⚠️ Risky trades", question: "Any risky trades?" },
  { label: "📝 Explain last trade", question: "Explain last trade" },
  { label: "💰 Portfolio", question: "What's my portfolio value?" },
  { label: "🕐 10am activity", question: "What happened at 10am?" },
];