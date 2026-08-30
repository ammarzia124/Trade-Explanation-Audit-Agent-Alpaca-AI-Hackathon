function TradeDetailPanel({ trade, onClose }) {
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

  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Trade Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            AI trade analysis
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Symbol */}
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Symbol
        </p>

        <p className="mt-1 text-2xl font-bold text-white">
          {trade.symbol}
        </p>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-2 gap-4">

        <div>
          <p className="text-xs text-gray-500">
            Action
          </p>

          <p
            className={`mt-1 font-semibold ${
              trade.side === "BUY"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {trade.side}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Amount
          </p>

          <p className="mt-1 font-semibold text-white">
            ${trade.total.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Status
          </p>

          <p
            className={`mt-1 font-semibold ${
              trade.status === "FILLED"
                ? "text-green-400"
                : trade.status === "BLOCKED"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {trade.status}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Risk
          </p>

          <p
            className={`mt-1 font-semibold ${
              trade.risk === "LOW"
                ? "text-green-400"
                : trade.risk === "MEDIUM"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {trade.risk}
          </p>
        </div>

      </div>

      {/* AI Explanation */}
      <div className="mt-6 rounded-lg border border-gray-800 bg-[#0D1117] p-4">

        <p className="text-sm font-semibold text-white">
          AI Explanation
        </p>

        <p className="mt-2 text-sm leading-6 text-gray-400">
          {trade.explanation}
        </p>

      </div>

      {/* Timestamp */}
      <div className="mt-5">
        <p className="text-xs text-gray-500">
          Trade Time
        </p>

        <p className="mt-1 text-sm text-gray-300">
          {trade.timestamp}
        </p>
      </div>

    </div>
  );
}

export default TradeDetailPanel;