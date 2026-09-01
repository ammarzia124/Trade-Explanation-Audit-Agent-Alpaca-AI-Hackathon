const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = 'llama-3.3-70b-versatile';

async function explainTrade(tradeData) {
  const { symbol, side, qty, price, total, status, portfolioValue } = tradeData;
  const riskScore = scoreRisk(total, portfolioValue);

  try {
    console.log(`[AI] Explaining trade: ${side} ${qty} ${symbol}`);

    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a financial trade audit AI assistant. Given a trade, explain in exactly 3 sentences: (1) what the trade was, (2) why it likely happened based on portfolio context, (3) its risk level and portfolio impact. Be clear, concise, and use plain English. No jargon. No markdown formatting.',
        },
        {
          role: 'user',
          content: JSON.stringify(tradeData),
        },
      ],
      max_tokens: 500,
    });

    const explanation = response.choices[0].message.content;
    console.log(`[AI] Explanation generated for ${symbol}`);

    return { explanation, riskScore };
  } catch (error) {
    console.error('[AI] Error explaining trade:', error.message);
    return { explanation: 'Explanation unavailable.', riskScore: 'MEDIUM' };
  }
}

async function answerQuestion(question, recentTrades) {
  try {
    console.log(`[AI] Answering question: "${question.substring(0, 50)}..."`);

    const response = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a trading assistant AI. You have access to recent trade data provided below. Answer the user question clearly in 2-3 sentences only. Be direct and helpful. Recent trades: ' + JSON.stringify(recentTrades),
        },
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 200,
    });

    const answer = response.choices[0].message.content;
    console.log('[AI] Answer generated');

    return { answer };
  } catch (error) {
    console.error('[AI] Error answering question:', error.message);
    return { answer: 'AI is temporarily unavailable. Please try again.' };
  }
}

function scoreRisk(tradeTotal, portfolioValue) {
  if (!portfolioValue || !tradeTotal || portfolioValue <= 0) return 'MEDIUM';
  const percentage = (tradeTotal / portfolioValue) * 100;
  if (percentage < 5) return 'LOW';
  if (percentage <= 15) return 'MEDIUM';
  return 'HIGH';
}

module.exports = { explainTrade, answerQuestion, scoreRisk };
