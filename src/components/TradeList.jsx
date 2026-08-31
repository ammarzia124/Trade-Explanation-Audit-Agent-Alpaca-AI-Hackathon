import { useEffect, useState } from "react";
import TradeDetailPanel from "./TradeDetailPanel";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

const mockTrades = [
  {
    id: 1,
    symbol: "AAPL",
    side: "BUY",
    qty: 10,
    price: 200,
    total: 2000,
    status: "FILLED",
    risk: "LOW",
    timestamp: "10:02 AM",
    explanation:
      "AAPL purchased to increase Technology allocation.",
  },
  {
    id: 2,
    symbol: "TSLA",
    side: "SELL",
    qty: 5,
    price: 300,
    total: 1500,
    status: "FILLED",
    risk: "MEDIUM",
    timestamp: "10:15 AM",
    explanation:
      "TSLA sold to reduce overweight position.",
  },
  {
    id: 3,
    symbol: "NVDA",
    side: "BUY",
    qty: 20,
    price: 350,
    total: 7000,
    status: "BLOCKED",
    risk: "HIGH",
    timestamp: "10:22 AM",
    explanation:
      "Trade blocked — exceeds 15% position limit.",
  },
];

function TradeList() {
  const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTrades = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      // Convert API orders into our dashboard format
      const formattedTrades = Array.isArray(data)
        ? data.map((order) => ({
            id: order.id,
            symbol: order.symbol,
            side: order.side?.toUpperCase(),
            qty: Number(order.qty || 0),
            price: Number(order.filled_avg_price || order.limit_price || 0),
            total:
              Number(order.qty || 0) *
              Number(order.filled_avg_price || order.limit_price || 0),
            status: order.status?.toUpperCase() || "PENDING",
            risk: order.risk?.toUpperCase() || "LOW",
            timestamp: order.created_at
              ? new Date(order.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            explanation:
              order.explanation ||
              "AI explanation will be available after trade analysis.",
          }))
        : [];

      setTrades(formattedTrades);
      setError(false);
    } catch (err) {
      console.error("Orders API Error:", err);
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

  const displayTrades =
    !loading && !error && trades.length === 0
      ? []
      : trades;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* Trade Table */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] xl:col-span-2">

        {/* Header */}
        <div className="border-b border-gray-800 p-5">
          <h2 className="text-lg font-semibold text-white">
            Recent Trades
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Click a trade to view AI explanation
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-8 text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-700 border-t-blue-400" />

            <p className="mt-3 text-sm text-gray-500">
              Loading trades...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="p-8 text-center">
            <p className="text-sm text-red-400">
              Could not connect to API.
            </p>

            <button
              onClick={fetchTrades}
              className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-500"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && displayTrades.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-gray-400">
              No trades available yet.
            </p>

            <p className="mt-1 text-xs text-gray-600">
              New orders will appear here automatically.
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && displayTrades.length > 0 && (
          <div className="max-h-80 overflow-y-auto overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">

              <thead className="sticky top-0 bg-[#161B22]">
                <tr className="border-b border-gray-800 text-sm text-gray-500">

                  <th className="px-5 py-4">
                    Time
                  </th>

                  <th className="px-5 py-4">
                    Stock
                  </th>

                  <th className="px-5 py-4">
                    BUY / SELL
                  </th>

                  <th className="px-5 py-4">
                    Amount
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody>
                {displayTrades.map((trade) => (
                  <tr
                    key={trade.id}
                    onClick={() => setSelectedTrade(trade)}
                    className="cursor-pointer border-b border-gray-800 transition hover:bg-[#1C2128]"
                  >

                    <td className="px-5 py-4 text-sm text-gray-400">
                      {trade.timestamp}
                    </td>

                    <td className="px-5 py-4 font-semibold text-white">
                      {trade.symbol}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          trade.side === "BUY"
                            ? "font-medium text-green-400"
                            : "font-medium text-red-400"
                        }
                      >
                        {trade.side}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-300">
                      ${trade.total.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          trade.status === "FILLED"
                            ? "rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
                            : trade.status === "BLOCKED"
                            ? "rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400"
                            : "rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400"
                        }
                      >
                        {trade.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

      {/* Detail Panel */}
      <TradeDetailPanel
        trade={selectedTrade}
        onClose={() => setSelectedTrade(null)}
      />

    </div>
  );
}

export default TradeList;