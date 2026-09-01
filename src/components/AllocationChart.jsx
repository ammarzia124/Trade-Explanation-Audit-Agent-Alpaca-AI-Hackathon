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

function AllocationChart() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPositions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/positions`);

      if (!response.ok) {
        throw new Error("Failed to fetch positions");
      }

      const data = await response.json();

      setPositions(Array.isArray(data) ? data : []);
      setError(false);
    } catch (err) {
      console.error("Positions API Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();

    const interval = setInterval(fetchPositions, 10000);

    return () => clearInterval(interval);
  }, []);

  // Convert API positions into chart data
  const chartData = positions
    .map((position) => ({
      name: position.symbol,
      value: Math.abs(
        Number(position.market_value || position.marketValue || 0)
      ),
    }))
    .filter((item) => item.value > 0);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">
        <div className="h-64 animate-pulse rounded-lg bg-[#0D1117]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-[#161B22] p-6">
        <h2 className="text-lg font-semibold text-white">
          Portfolio Allocation
        </h2>

        <p className="mt-4 text-sm text-red-400">
          Could not connect to positions API.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Portfolio Allocation
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current portfolio positions
        </p>
      </div>

      {/* Empty State */}
      {chartData.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-400">
              No open positions
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Portfolio allocation will appear here when positions are available.
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
                paddingAngle={3}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  `$${Number(value).toLocaleString()}`
                }
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

export default AllocationChart;