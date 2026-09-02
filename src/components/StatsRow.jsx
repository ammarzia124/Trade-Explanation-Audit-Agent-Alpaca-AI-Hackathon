import { useEffect, useState } from "react";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

function StatsRow() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSummary = async () => {
    try {
      const response = await fetch(`${API_URL}/api/summary`);

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();

      setSummary(data);
      setError(false);
    } catch (err) {
      console.error("Summary API Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();

    // Refresh every 10 seconds
    const interval = setInterval(fetchSummary, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-xl border border-gray-800 bg-[#161B22]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
        <p className="text-sm text-red-400">
          Could not connect to summary API.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Total Trades */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Total Trades
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {summary?.total ?? 0}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Total trades recorded
        </p>
      </div>


      {/* Filled */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <p className="text-sm text-gray-400">
          Filled
        </p>

        <h3 className="mt-2 text-2xl font-bold text-green-400">
          {summary?.filled ?? 0}
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
          {summary?.blocked ?? 0}
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
          {summary?.highRisk ?? 0}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Trades requiring attention
        </p>
      </div>

    </div>
  );
}

export default StatsRow;