import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useTrades } from '../../context/TradeContext';
import { useTheme } from '../../context/ThemeContext';

const COLORS = {
  low: '#22C55E',
  medium: '#EAB308',
  high: '#F97316',
  critical: '#EF4444',
};

const RISK_COLORS = {
  LOW: '#22C55E',
  MEDIUM: '#EAB308',
  HIGH: '#EF4444',
};

function CustomTooltip({ active, payload, label }) {
  const { isDark } = useTheme();
  if (!active || !payload?.length) return null;

  return (
    <div className={`rounded-card px-3 py-2 border text-caption ${
      isDark
        ? 'bg-base-light border-base-border text-text-primary'
        : 'bg-white border-slate-200 text-slate-700'
    }`}>
      {label && <p className="font-medium mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="text-text-secondary">
          {entry.name}: <span className="font-medium text-text-primary">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: RISK_COLORS[entry.value] || entry.color }} />
          <span className="text-micro text-text-secondary">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function RiskChart() {
  const { trades } = useTrades();
  const { isDark } = useTheme();

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

  const textColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : '#E5E7EB';

  if (trades.length === 0) {
    return (
      <div className="card">
        <h3 className="section-title mb-4">Trade Analytics</h3>
        <p className="text-text-secondary text-center py-12">No trade data available yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card" aria-label="Risk distribution chart">
        <h3 className="section-title mb-4">Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={riskDistribution}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              dataKey="value"
              strokeWidth={0}
            >
              {riskDistribution.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card" aria-label="Trades by symbol chart">
        <h3 className="section-title mb-4">Trades by Symbol</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={tradesBySymbol}>
            <defs>
              <linearGradient id="barGradientRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="symbol"
              tick={{ fontSize: 12, fill: textColor }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: textColor }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="url(#barGradientRisk)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
