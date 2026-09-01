import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTrades } from '../../context/TradeContext';

const COLORS = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
};

export default function RiskChart() {
  const { trades } = useTrades();

  const riskDistribution = [
    { name: 'Low', value: trades.filter(t => t.risk_category === 'low').length, color: COLORS.low },
    { name: 'Medium', value: trades.filter(t => t.risk_category === 'medium').length, color: COLORS.medium },
    { name: 'High', value: trades.filter(t => t.risk_category === 'high').length, color: COLORS.high },
    { name: 'Critical', value: trades.filter(t => t.risk_category === 'critical').length, color: COLORS.critical },
  ].filter(d => d.value > 0);

  const tradesBySymbol = Object.entries(
    trades.reduce((acc, t) => {
      acc[t.symbol] = (acc[t.symbol] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([symbol, count]) => ({ symbol, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  if (trades.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Trade Analytics</h3>
        <p className="text-gray-500 text-center py-8">No trade data available yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={riskDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {riskDistribution.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Trades by Symbol</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={tradesBySymbol}>
            <XAxis dataKey="symbol" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
