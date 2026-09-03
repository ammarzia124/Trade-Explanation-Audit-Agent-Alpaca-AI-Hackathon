import { Shield, AlertTriangle, XCircle } from 'lucide-react';

const TradeExplainCard = ({ data }) => {
  const { symbol, action, amount, risk, explanation } = data;

  const riskConfig = {
    LOW: {
      color: 'bg-success-muted text-success border-success/20',
      icon: <Shield className="h-3 w-3" />,
      label: 'LOW RISK'
    },
    MEDIUM: {
      color: 'bg-warning-muted text-warning border-warning/20',
      icon: <AlertTriangle className="h-3 w-3" />,
      label: 'MEDIUM RISK'
    },
    HIGH: {
      color: 'bg-danger-muted text-danger border-danger/20',
      icon: <XCircle className="h-3 w-3" />,
      label: 'HIGH RISK'
    }
  };

  const config = riskConfig[risk] || riskConfig.LOW;

  return (
    <div className="mt-3 rounded-card border border-base-border bg-base p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-body font-bold text-text-primary">{symbol}</span>
          <span className={`rounded-pill border px-2.5 py-0.5 text-micro font-medium ${
            action === 'BUY'
              ? 'bg-success-muted text-success border-success/20'
              : 'bg-danger-muted text-danger border-danger/20'
          }`}>
            {action}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 text-micro font-medium ${config.color}`}>
          {config.icon} {config.label}
        </div>
      </div>
      <div className="mt-1.5 text-caption text-text-secondary">
        <span className="text-text-muted">Amount: </span>
        <span className="text-text-primary">${amount?.toLocaleString() || amount}</span>
      </div>
      {explanation && (
        <div className="mt-1.5 text-caption leading-relaxed text-text-secondary">{explanation}</div>
      )}
    </div>
  );
};

export default TradeExplainCard;
