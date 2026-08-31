import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

function TradeVolumeChart() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
      setError(false);
    } catch (err) {
      console.error("Trade Volume API Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Refresh every 10 seconds
    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, []);

  // Group trade amounts by hour
  const hourlyData = {};

  orders.forEach((order) => {
    if (!order.created_at) return;

    const date = new Date(order.created_at);

    const hour = date.getHours();

    const price = Number(
      order.filled_avg_price ||
        order.limit_price ||
        order.price ||
        0
    );

    const qty = Number(order.qty || 0);

    const amount = price * qty;

    const label = `${hour.toString().padStart(2, "0")}:00`;

    if (!hourlyData[label]) {
      hourlyData[label] = 0;
    }

    hourlyData[label] += amount;
  });

  const chartData = Object.entries(hourlyData)
    .map(([hour, amount]) => ({
      hour,
      amount,
    }))
    .sort((a, b) => a.hour.localeCompare(b.hour));

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
          Trade Volume
        </h2>

        <p className="mt-4 text-sm text-red-400">
          Could not connect to orders API.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Trade Volume
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Trading activity by hour
        </p>
      </div>

      {/* Empty State */}
      {chartData.length === 0 ? (
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-400">
              No trade volume available
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Trade activity will appear here when orders are placed.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#30363D"
              />

              <XAxis
                dataKey="hour"
                tick={{ fill: "#8B949E", fontSize: 12 }}
                axisLine={{ stroke: "#30363D" }}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#8B949E", fontSize: 12 }}
                axisLine={{ stroke: "#30363D" }}
                tickLine={false}
              />

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

              <Bar
                dataKey="amount"
                name="Trade Volume"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}

export default TradeVolumeChart;