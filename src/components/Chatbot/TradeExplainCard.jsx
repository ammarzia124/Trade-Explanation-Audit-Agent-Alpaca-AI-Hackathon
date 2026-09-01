import React from 'react';
import { Shield, AlertTriangle, XCircle } from 'lucide-react';

const TradeExplainCard = ({ data }) => {
  const { symbol, action, amount, risk, explanation } = data;

  const riskConfig = {
    LOW: {
      color: 'bg-[#3FB950]/20 text-[#3FB950] border-[#3FB950]/30',
      icon: <Shield className="w-3 h-3" />,
      label: 'LOW RISK'
    },
    MEDIUM: {
      color: 'bg-[#D29922]/20 text-[#D29922] border-[#D29922]/30',
      icon: <AlertTriangle className="w-3 h-3" />,
      label: 'MEDIUM RISK'
    },
    HIGH: {
      color: 'bg-[#F85149]/20 text-[#F85149] border-[#F85149]/30',
      icon: <XCircle className="w-3 h-3" />,
      label: 'HIGH RISK'
    }
  };

  const config = riskConfig[risk] || riskConfig.LOW;

  return (
    <div className="mt-3 p-3 bg-[#0D1117] rounded-xl border border-[#30363D]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-white text-sm">{symbol}</span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
            action === 'BUY' 
              ? 'bg-[#3FB950]/15 text-[#3FB950] border border-[#3FB950]/30' 
              : action === 'BLOCKED'
              ? 'bg-[#F85149]/15 text-[#F85149] border border-[#F85149]/30'
              : 'bg-[#F85149]/15 text-[#F85149] border border-[#F85149]/30'
          }`}>
            {action}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${config.color}`}>
          {config.icon} {config.label}
        </div>
      </div>
      <div className="text-xs text-[#8B949E] mt-1.5">
        <span className="text-gray-500">Amount: </span>
        <span className="text-white">${amount?.toLocaleString() || amount}</span>
      </div>
      <div className="text-xs text-gray-300 mt-1 leading-relaxed">{explanation}</div>
    </div>
  );
};

export default TradeExplainCard;