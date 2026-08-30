import { useState } from "react";

const mockAuditLogs = [
  {
    id: 1,
    timestamp: "10:22 AM",
    symbol: "NVDA",
    side: "BUY",
    amount: 7000,
    status: "BLOCKED",
    risk: "HIGH",
    explanation:
      "Trade blocked — exceeds 15% position limit.",
  },
  {
    id: 2,
    timestamp: "10:15 AM",
    symbol: "TSLA",
    side: "SELL",
    amount: 1500,
    status: "FILLED",
    risk: "MEDIUM",
    explanation:
      "TSLA sold to reduce overweight position.",
  },
  {
    id: 3,
    timestamp: "10:02 AM",
    symbol: "AAPL",
    side: "BUY",
    amount: 2000,
    status: "FILLED",
    risk: "LOW",
    explanation:
      "AAPL purchased to increase Technology allocation.",
  },
  {
    id: 4,
    timestamp: "09:48 AM",
    symbol: "MSFT",
    side: "BUY",
    amount: 3200,
    status: "FILLED",
    risk: "LOW",
    explanation:
      "MSFT purchased as part of the Technology allocation.",
  },
  {
    id: 5,
    timestamp: "09:35 AM",
    symbol: "AMZN",
    side: "BUY",
    amount: 4500,
    status: "PENDING",
    risk: "MEDIUM",
    explanation:
      "AMZN trade is waiting for risk validation.",
  },
  {
    id: 6,
    timestamp: "09:20 AM",
    symbol: "META",
    side: "SELL",
    amount: 2800,
    status: "FILLED",
    risk: "LOW",
    explanation:
      "META position reduced to maintain portfolio balance.",
  },
];

function AuditLogTable() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");

  const filteredLogs = mockAuditLogs
    .filter((trade) =>
      trade.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .filter((trade) =>
      riskFilter === "ALL" ? true : trade.risk === riskFilter
    );

  return (
    <div className="mt-8 rounded-xl border border-gray-800 bg-[#161B22]">

      {/* Header */}
      <div className="border-b border-gray-800 p-5">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Audit Log
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Complete history of trading activity
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <input
            type="text"
            placeholder="Search by symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500 sm:w-64"
          />

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-2.5 text-sm text-gray-300 outline-none focus:border-blue-500"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px] text-left">

          {/* Table Header */}
          <thead className="bg-[#0D1117]">
            <tr className="border-b border-gray-800 text-xs uppercase tracking-wide text-gray-500">

              <th className="px-5 py-4">
                ID
              </th>

              <th className="px-5 py-4">
                Time
              </th>

              <th className="px-5 py-4">
                Symbol
              </th>

              <th className="px-5 py-4">
                Action
              </th>

              <th className="px-5 py-4">
                Amount
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4">
                Risk
              </th>

              <th className="px-5 py-4">
                AI Explanation
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {filteredLogs.length > 0 ? (
              filteredLogs.map((trade) => (
                <tr
                  key={trade.id}
                  className="border-b border-gray-800 transition hover:bg-[#1C2128]"
                >

                  {/* ID */}
                  <td className="px-5 py-4 text-sm text-gray-500">
                    #{trade.id}
                  </td>

                  {/* Time */}
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {trade.timestamp}
                  </td>

                  {/* Symbol */}
                  <td className="px-5 py-4 font-semibold text-white">
                    {trade.symbol}
                  </td>

                  {/* Action */}
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

                  {/* Amount */}
                  <td className="px-5 py-4 text-sm text-gray-300">
                    ${trade.amount.toLocaleString()}
                  </td>

                  {/* Status */}
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

                  {/* Risk */}
                  <td className="px-5 py-4">

                    <span
                      className={
                        trade.risk === "LOW"
                          ? "rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
                          : trade.risk === "MEDIUM"
                          ? "rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400"
                          : "rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400"
                      }
                    >
                      {trade.risk}
                    </span>

                  </td>

                  {/* Explanation */}
                  <td className="max-w-xs px-5 py-4 text-sm text-gray-400">
                    <div className="truncate">
                      {trade.explanation}
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="px-5 py-10 text-center text-sm text-gray-500"
                >
                  No trades found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-5 py-4">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-300">
            {filteredLogs.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-300">
            {mockAuditLogs.length}
          </span>{" "}
          trades
        </p>

      </div>

    </div>
  );
}

export default AuditLogTable;