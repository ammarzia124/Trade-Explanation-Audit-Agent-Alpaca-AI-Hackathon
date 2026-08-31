import { useEffect, useState } from "react";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

function TradeDetailPanel({ trade, onClose }) {
  const [explanation, setExplanation] = useState("");
  const [riskScore, setRiskScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!trade) {
      setExplanation("");
      setRiskScore("");
      return;
    }

    const getAIExplanation = async () => {
      setLoading(true);
      setError(false);
      setExplanation("");
      setRiskScore("");

      try {
        const response = await fetch(`${API_URL}/api/explain`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol: trade.symbol,
            side: String(trade.side || "").toLowerCase(),
            qty: Number(trade.qty || 0),
            price: Number(trade.price || 0),
            total: Number(
              trade.total ||
                Number(trade.qty || 0) * Number(trade.price || 0)
            ),
            status: String(trade.status || "").toLowerCase(),
            portfolioValue: Number(trade.portfolioValue || 0),
          }),
        });

        if (!response.ok) {
          throw new Error("AI explanation request failed");
        }

        const data = await response.json();

        setExplanation(
          data.explanation || "No AI explanation available."
        );

        setRiskScore(
          data.riskScore || "UNKNOWN"
        );
      } catch (err) {
        console.error("AI Explain Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getAIExplanation();
  }, [trade]);

  // No trade selected
  if (!trade) {
    return (
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">
        <h2 className="text-lg font-semibold text-white">
          Trade Details
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          Click a trade to view its details and AI explanation.
        </p>
      </div>
    );
  }

  const riskColor =
    riskScore === "LOW"
      ? "bg-green-500/10 text-green-400"
      : riskScore === "MEDIUM"
      ? "bg-yellow-500/10 text-yellow-400"
      : riskScore === "HIGH"
      ? "bg-red-500/10 text-red-400"
      : "bg-gray-500/10 text-gray-400";

  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Trade Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            AI-powered trade analysis
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg px-2 py-1 text-gray-500 transition hover:bg-gray-800 hover:text-white"
        >
          ✕
        </button>

      </div>

      {/* Symbol */}
      <div className="mt-6">

        <p className="text-sm text-gray-500">
          Symbol
        </p>

        <p className="mt-1 text-3xl font-bold text-white">
          {trade.symbol}
        </p>

      </div>

      {/* Trade Details */}
      <div className="mt-6 grid grid-cols-2 gap-5">

        {/* Action */}
        <div>
          <p className="text-xs text-gray-500">
            Action
          </p>

          <p
            className={`mt-1 font-semibold ${
              String(trade.side).toUpperCase() === "BUY"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {String(trade.side || "N/A").toUpperCase()}
          </p>
        </div>

        {/* Amount */}
        <div>
          <p className="text-xs text-gray-500">
            Amount
          </p>

          <p className="mt-1 font-semibold text-white">
            $
            {Number(
              trade.total || 0
            ).toLocaleString()}
          </p>
        </div>

        {/* Quantity */}
        <div>
          <p className="text-xs text-gray-500">
            Quantity
          </p>

          <p className="mt-1 font-semibold text-white">
            {trade.qty || 0}
          </p>
        </div>

        {/* Status */}
        <div>
          <p className="text-xs text-gray-500">
            Status
          </p>

          <p
            className={`mt-1 font-semibold ${
              String(trade.status).toUpperCase() === "FILLED"
                ? "text-green-400"
                : String(trade.status).toUpperCase() === "BLOCKED"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {String(
              trade.status || "N/A"
            ).toUpperCase()}
          </p>
        </div>

      </div>

      {/* AI Analysis */}
      <div className="mt-6 rounded-xl border border-gray-800 bg-[#0D1117] p-5">

        <div className="flex items-center justify-between gap-3">

          <p className="text-sm font-semibold text-white">
            🤖 AI Explanation
          </p>

          {/* Risk Badge */}
          {riskScore && !loading && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${riskColor}`}
            >
              {riskScore} RISK
            </span>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-4">

            <div className="flex items-center gap-3">

              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-blue-400" />

              <p className="text-sm text-gray-500">
                AI is analyzing this trade...
              </p>

            </div>

          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-4">

            <p className="text-sm text-red-400">
              Could not get AI explanation from the API.
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Please check the backend connection.
            </p>

          </div>
        )}

        {/* Explanation */}
        {!loading && !error && explanation && (
          <p className="mt-4 text-sm leading-6 text-gray-400">
            {explanation}
          </p>
        )}

      </div>

      {/* Timestamp */}
      <div className="mt-5">

        <p className="text-xs text-gray-500">
          Trade Time
        </p>

        <p className="mt-1 text-sm text-gray-300">
          {trade.timestamp || trade.created_at || "N/A"}
        </p>

      </div>

    </div>
  );
}

export default TradeDetailPanel;