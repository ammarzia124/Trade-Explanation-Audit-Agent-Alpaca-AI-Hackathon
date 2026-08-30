

function PortfolioHeader() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

      {/* Portfolio Value */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Portfolio Value
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          $25,430
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Total account value
        </p>
      </div>

      {/* Today Profit/Loss */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Today Profit/Loss
        </p>

        <h2 className="mt-2 text-2xl font-bold text-green-400">
          +$342.50
        </h2>

        <p className="mt-2 text-sm text-green-500">
          +1.36% today
        </p>
      </div>

      {/* Cash Available */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Cash Available
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          $8,250
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Available to trade
        </p>
      </div>

    </div>
  );
}

export default PortfolioHeader;