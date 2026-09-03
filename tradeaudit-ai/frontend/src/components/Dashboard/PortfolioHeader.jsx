import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { usePortfolioQuery } from '../../hooks/usePortfolioQuery';
import SkeletonCard from '../common/SkeletonCard';
import ErrorCard from '../common/ErrorCard';

const CARDS = [
  { key: 'value', label: 'Portfolio Value', field: 'equity', icon: DollarSign, iconBg: 'bg-accent-muted', iconColor: 'text-accent' },
  { key: 'equity', label: 'Account Equity', field: 'equity', icon: TrendingUp, iconBg: 'bg-success-muted', iconColor: 'text-success' },
  { key: 'cash', label: 'Cash Available', field: 'cash', icon: Wallet, iconBg: 'bg-base-elevated', iconColor: 'text-text-secondary' },
];

export default function PortfolioHeader() {
  const { data: portfolio, isLoading, error, refetch } = usePortfolioQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} height="h-20" />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorCard title="Portfolio" message={error.message} onRetry={refetch} />;
  }

  const equity = Number(portfolio?.equity || 0);
  const cash = Number(portfolio?.cash || 0);

  const values = { equity, cash };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {CARDS.map(({ key, label, field, icon: Icon, iconBg, iconColor }) => (
        <article
          key={key}
          className="card group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption text-text-muted">{label}</p>
              <h2 className="mt-2 stat-number text-text-primary">
                ${values[field].toLocaleString()}
              </h2>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-card ${iconBg} transition-transform duration-200 group-hover:scale-110`}>
              <Icon className={iconColor} size={24} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
