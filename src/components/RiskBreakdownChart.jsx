import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

function RiskBreakdownChart() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTrades = async () => {
    try {
      const response = await fetch(`${API_URL}/api/trades`);

      if (!response.ok) {
        throw new Error("Failed to fetch trades");
      }

      const data = await response.json();

      setTrades(Array.isArray(data) ? data : []);
      setError(false);
    } catch (err) {
      console.error("Risk API Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();

    // Refresh every 10 seconds
    const interval = setInterval(fetchTrades, 10000);

    return () => clearInterval(interval);
  }, []);

  // Count risks
  const riskCounts = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
  };

  trades.forEach((trade) => {
    const risk = (
      trade.risk ||
      trade.risk_level ||
      trade.riskLevel ||
      "LOW"
    ).toUpperCase();

    if (riskCounts[risk] !== undefined) {
      riskCounts[risk]++;
    }
  });

  const chartData = [
    {
      name: "LOW",
      value: riskCounts.LOW,
    },
    {
      name: "MEDIUM",
      value: riskCounts.MEDIUM,
    },
    {
      name: "HIGH",
      value: riskCounts.HIGH,
    },
  ].filter((item) => item.value > 0);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">
        <div className="h-72 animate-pulse rounded-lg bg-[#0D1117]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-[#161B22] p-6">
        <h2 className="text-lg font-semibold text-white">
          Risk Analysis
        </h2>

        <p className="mt-4 text-sm text-red-400">
          Could not connect to trades API.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Risk Analysis
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Trade risk breakdown
        </p>
      </div>

      {/* Empty State */}
      {chartData.length === 0 ? (
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-400">
              No risk data available
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Risk analysis will appear when trades are recorded.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`risk-${index}`} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [value, "Trades"]}
                contentStyle={{
                  backgroundColor: "#161B22",
                  border: "1px solid #30363D",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}

export default RiskBreakdownChart;