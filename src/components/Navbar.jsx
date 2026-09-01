import { Bell, CircleUserRound } from "lucide-react";

function Navbar() {
  return (
    <nav className="h-16 border-b border-gray-800 bg-[#0D1117] px-6 flex items-center justify-between">
      
      {/* Logo / Project Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="font-bold text-white">T</span>
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">
            TradeGuard AI
          </h1>
          <p className="text-xs text-gray-500">
            Trading Dashboard
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Live Status */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-sm text-green-400">
            Live
          </span>
        </div>

        {/* Notification */}
        <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <CircleUserRound size={25} className="text-gray-400" />

          <span className="text-sm text-gray-300">
            Amna
          </span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;