import { X, Bot, ShieldCheck, Clock3 } from "lucide-react";

function TradeDetailPanel({ trade, onClose }) {
  if (!trade) {
    return (
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <Bot className="text-blue-400" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Trade Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select a trade to view AI analysis
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-dashed border-gray-800 p-6 text-center">
          <p className="text-sm text-gray-500">
            Click any trade from the table to see its details.
          </p>
        </div>
      </div>
    );
  }

  const riskClass =
    trade.risk === "LOW"
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : trade.risk === "MEDIUM"
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      : "bg-red-500/10 text-red-400 border-red-500/20";

  const statusClass =
    trade.status === "FILLED"
      ? "bg-green-500/10 text-green-400"
      : trade.status === "BLOCKED"
      ? "bg-red-500/10 text-red-400"
      : "bg-yellow-500/10 text-yellow-400";

  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-6">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <Bot className="text-blue-400" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Trade Details
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              AI-powered trade analysis
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-[#1C2128] hover:text-white"
          aria-label="Close trade details"
        >
          <X size={20} />
        </button>

      </div>


      {/* Symbol */}
      <div className="mt-6 rounded-xl border border-gray-800 bg-[#0D1117] p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Symbol
            </p>

            <h3 className="mt-1 text-3xl font-bold text-white">
              {trade.symbol}
            </h3>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              trade.side === "BUY"
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {trade.side}
          </span>

        </div>

      </div>


      {/* Trade Information */}
      <div className="mt-5 grid grid-cols-2 gap-4">

        <div className="rounded-lg border border-gray-800 p-4">
          <p className="text-xs text-gray-500">
            Quantity
          </p>

          <p className="mt-1 font-semibold text-white">
            {trade.qty}
          </p>
        </div>


        <div className="rounded-lg border border-gray-800 p-4">
          <p className="text-xs text-gray-500">
            Price
          </p>

          <p className="mt-1 font-semibold text-white">
            ${trade.price.toLocaleString()}
          </p>
        </div>


        <div className="rounded-lg border border-gray-800 p-4">
          <p className="text-xs text-gray-500">
            Total Amount
          </p>

          <p className="mt-1 font-semibold text-white">
            ${trade.total.toLocaleString()}
          </p>
        </div>


        <div className="rounded-lg border border-gray-800 p-4">
          <p className="text-xs text-gray-500">
            Status
          </p>

          <span
            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}
          >
            {trade.status}
          </span>
        </div>

      </div>


      {/* Risk */}
      <div className="mt-5">

        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck size={17} className="text-gray-400" />

          <p className="text-sm font-medium text-gray-300">
            Risk Level
          </p>
        </div>

        <div
          className={`rounded-lg border px-4 py-3 text-sm font-semibold ${riskClass}`}
        >
          {trade.risk} RISK
        </div>

      </div>


      {/* AI Explanation */}
      <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">

        <div className="flex items-center gap-2">
          <Bot size={18} className="text-blue-400" />

          <p className="text-sm font-semibold text-white">
            AI Explanation
          </p>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          {trade.explanation}
        </p>

      </div>


      {/* Timestamp */}
      <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">

        <Clock3 size={15} />

        <span>
          Trade executed at {trade.timestamp}
        </span>

      </div>

    </div>
  );
}

export default TradeDetailPanel;