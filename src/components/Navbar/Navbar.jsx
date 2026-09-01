import React from 'react';
import { Sparkles } from 'lucide-react';
import DemoMode from '../Demo/DemoMode';

const Navbar = ({ onDemoStart, onDemoComplete }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0D1117]/90 backdrop-blur-md border-b border-[#30363D] px-6 py-3">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#58A6FF] rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-sm">TradeGuard AI</span>
          <span className="text-[10px] text-[#8B949E] hidden sm:inline">
            | Alpaca Hackathon 2026
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* ✅ Pass the functions to DemoMode */}
          <DemoMode 
            onDemoStart={onDemoStart} 
            onDemoComplete={onDemoComplete}
          />
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#3FB950]/10 rounded-full border border-[#3FB950]/20">
            <span className="w-2 h-2 bg-[#3FB950] rounded-full pulse-dot" />
            <span className="text-[11px] text-[#3FB950] font-medium">LIVE</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;