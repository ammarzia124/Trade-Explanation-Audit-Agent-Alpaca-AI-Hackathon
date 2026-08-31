import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

function PortfolioHeader() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`${API_URL}/api/portfolio`);

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio");
      }

      const data = await response.json();

      setPortfolio(data);
      setError(false);
    } catch (err) {
      console.error("Portfolio API Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();

    const interval = setInterval(fetchPortfolio, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
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
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
        <p className="text-sm text-red-400">
          Could not connect to portfolio API.
        </p>
      </div>
    );
  }

  const equity = Number(portfolio?.equity || 0);
  const cash = Number(portfolio?.cash || 0);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

      {/* Portfolio Value */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-400">
              Portfolio Value
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              ${equity.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-lg bg-blue-500/10 p-3">
            <DollarSign
              className="text-blue-400"
              size={24}
            />
          </div>

        </div>
      </div>


      {/* Account Equity */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-400">
              Account Equity
            </p>

            <h2 className="mt-2 text-2xl font-bold text-green-400">
              ${equity.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-lg bg-green-500/10 p-3">
            <TrendingUp
              className="text-green-400"
              size={24}
            />
          </div>

        </div>
      </div>


      {/* Cash Available */}
      <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-400">
              Cash Available
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              ${cash.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-lg bg-purple-500/10 p-3">
            <Wallet
              className="text-purple-400"
              size={24}
            />
          </div>

        </div>
      </div>

    </div>
  );
}

export default PortfolioHeader;