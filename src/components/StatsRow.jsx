function StatsRow() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Total Trades */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Total Trades
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          128
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Today's trades
        </p>
      </div>

      {/* Filled */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Filled
        </p>

        <h3 className="mt-2 text-2xl font-bold text-green-400">
          96
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Successfully executed
        </p>
      </div>

      {/* Blocked */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Blocked
        </p>

        <h3 className="mt-2 text-2xl font-bold text-red-400">
          12
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Prevented by risk rules
        </p>
      </div>

      {/* High Risk */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          High Risk
        </p>

        <h3 className="mt-2 text-2xl font-bold text-yellow-400">
          5
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Trades requiring attention
        </p>
      </div>

    </div>
  );
}

export default StatsRow;