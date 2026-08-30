import { useState } from "react";
import TradeDetailPanel from "./TradeDetailPanel";

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
  const [selectedTrade, setSelectedTrade] = useState(null);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* Trade Table */}
      <div className="xl:col-span-2 rounded-xl border border-gray-800 bg-[#161B22]">

        <div className="border-b border-gray-800 p-5">
          <h2 className="text-lg font-semibold text-white">
            Recent Trades
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Click a trade to view AI explanation
          </p>
        </div>

        <div className="max-h-80 overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">

            <thead className="sticky top-0 bg-[#161B22]">
              <tr className="border-b border-gray-800 text-sm text-gray-500">
                <th className="px-5 py-4">Time</th>
                <th className="px-5 py-4">Stock</th>
                <th className="px-5 py-4">BUY / SELL</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {mockTrades.map((trade) => (
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

