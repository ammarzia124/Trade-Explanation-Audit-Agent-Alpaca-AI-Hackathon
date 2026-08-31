import { useEffect, useState } from "react";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

function AuditLogTable() {
  const [trades, setTrades] = useState([]);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");
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
      console.error("Audit Log API Error:", err);
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

  // Search + risk filter
  const filteredTrades = trades
    .filter((trade) => {
      const symbol = String(trade.symbol || "").toLowerCase();

      return symbol.includes(search.toLowerCase());
    })
    .filter((trade) => {
      if (riskFilter === "ALL") return true;

      const risk = String(
        trade.risk ||
          trade.risk_level ||
          trade.riskLevel ||
          ""
      ).toUpperCase();

      return risk === riskFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(
        a.timestamp || a.created_at || 0
      );

      const dateB = new Date(
        b.timestamp || b.created_at || 0
      );

      return dateB - dateA;
    });

  const getRiskColor = (risk) => {
    const value = String(risk || "LOW").toUpperCase();

    if (value === "HIGH") {
      return "bg-red-500/10 text-red-400";
    }

    if (value === "MEDIUM") {
      return "bg-yellow-500/10 text-yellow-400";
    }

    return "bg-green-500/10 text-green-400";
  };

  const getStatusColor = (status) => {
    const value = String(status || "").toUpperCase();

    if (value === "FILLED") {
      return "bg-green-500/10 text-green-400";
    }

    if (value === "BLOCKED") {
      return "bg-red-500/10 text-red-400";
    }

    return "bg-yellow-500/10 text-yellow-400";
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">
        <div className="h-48 animate-pulse rounded-lg bg-[#0D1117]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-[#161B22] p-6">
        <h2 className="text-lg font-semibold text-white">
          Audit Logs
        </h2>

        <p className="mt-4 text-sm text-red-400">
          Could not connect to trades API.
        </p>

        <button
          onClick={fetchTrades}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22]">

      {/* Header */}
      <div className="border-b border-gray-800 p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 className="text-lg font-semibold text-white">
              Audit Logs
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Complete trade history and AI audit records
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2 sm:flex-row">

            {/* Search */}
            <input
              type="text"
              placeholder="Search symbol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-gray-800 bg-[#0D1117] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
            />

            {/* Risk Filter */}
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-lg border border-gray-800 bg-[#0D1117] px-3 py-2 text-sm text-gray-300 outline-none focus:border-blue-500"
            >
              <option value="ALL">All Risk</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>

          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredTrades.length === 0 && (
        <div className="p-10 text-center">

          <p className="text-sm font-medium text-gray-400">
            No audit records available.
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Trade history will appear here when trades are recorded.
          </p>

        </div>
      )}

      {/* Table */}
      {filteredTrades.length > 0 && (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead>
              <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500">

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

            <tbody>

              {filteredTrades.map((trade) => {

                const risk =
                  trade.risk ||
                  trade.risk_level ||
                  trade.riskLevel ||
                  "LOW";

                const status =
                  trade.status || "PENDING";

                const price = Number(
                  trade.price ||
                    trade.filled_avg_price ||
                    trade.limit_price ||
                    0
                );

                const qty = Number(trade.qty || 0);

                const amount = Number(
                  trade.total || price * qty
                );

                const timestamp =
                  trade.timestamp ||
                  trade.created_at ||
                  "N/A";

                return (
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
                      {timestamp !== "N/A"
                        ? new Date(timestamp).toLocaleString()
                        : "N/A"}
                    </td>

                    {/* Symbol */}
                    <td className="px-5 py-4 font-semibold text-white">
                      {trade.symbol || "N/A"}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">

                      <span
                        className={
                          String(trade.side).toUpperCase() === "BUY"
                            ? "font-medium text-green-400"
                            : "font-medium text-red-400"
                        }
                      >
                        {String(
                          trade.side || "N/A"
                        ).toUpperCase()}
                      </span>

                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4 text-sm text-gray-300">
                      ${amount.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                          status
                        )}`}
                      >
                        {String(status).toUpperCase()}
                      </span>

                    </td>

                    {/* Risk */}
                    <td className="px-5 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getRiskColor(
                          risk
                        )}`}
                      >
                        {String(risk).toUpperCase()}
                      </span>

                    </td>

                    {/* Explanation */}
                    <td className="max-w-xs px-5 py-4 text-sm text-gray-400">

                      <p className="truncate">
                        {trade.explanation ||
                          "AI explanation not available yet."}
                      </p>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default AuditLogTable;