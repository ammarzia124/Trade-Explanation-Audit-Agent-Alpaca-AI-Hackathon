import { Link, useLocation } from 'react-router-dom';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { useTrades } from '../../context/TradeContext';

export default function Navbar() {
  const { wsConnected, account } = useTrades();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
            TA
          </div>
          <span className="text-xl font-bold text-gray-900">TradeAudit AI</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {wsConnected ? (
              <><Wifi size={16} className="text-green-500" /> Live</>
            ) : (
              <><WifiOff size={16} className="text-gray-400" /> Offline</>
            )}
          </div>

          {account && (
            <div className="text-sm text-right">
              <div className="font-medium text-gray-900">
                ${Number(account.equity).toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">Equity</div>
            </div>
          )}

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Activity size={16} />
            <span>Paper Trading</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
