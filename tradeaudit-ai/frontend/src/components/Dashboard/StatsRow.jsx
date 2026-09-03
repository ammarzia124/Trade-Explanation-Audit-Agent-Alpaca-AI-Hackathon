import { BarChart3, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useSummaryQuery } from '../../hooks/useSummaryQuery';
import SkeletonCard from '../common/SkeletonCard';
import ErrorCard from '../common/ErrorCard';

const STATS = [
  { label: 'Total Trades', field: 'total', desc: 'Total trades recorded', icon: BarChart3, valueColor: 'text-text-primary', iconBg: 'bg-accent-muted', iconColor: 'text-accent' },
  { label: 'Filled', field: 'filled', desc: 'Successfully executed', icon: CheckCircle2, valueColor: 'text-success', iconBg: 'bg-success-muted', iconColor: 'text-success' },
  { label: 'Blocked', field: 'blocked', desc: 'Prevented by risk rules', icon: XCircle, valueColor: 'text-danger', iconBg: 'bg-danger-muted', iconColor: 'text-danger' },
  { label: 'High Risk', field: 'highRisk', desc: 'Trades requiring attention', icon: AlertTriangle, valueColor: 'text-warning', iconBg: 'bg-warning-muted', iconColor: 'text-warning' },
];

export default function StatsRow() {
  const { data: summary, isLoading, error, refetch } = useSummaryQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label="Loading statistics">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} height="h-16" />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorCard title="Statistics" message={error.message} onRetry={refetch} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="status" aria-live="polite">
      {STATS.map(({ label, field, desc, icon: Icon, valueColor, iconBg, iconColor }) => (
        <article
          key={field}
          className="card group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-caption text-text-muted">{label}</p>
              <h3 className={`mt-2 stat-number ${valueColor}`}>
                {summary?.[field] ?? 0}
              </h3>
              <p className="mt-1 text-micro text-text-muted">{desc}</p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-card ${iconBg} transition-transform duration-200 group-hover:scale-110`}>
              <Icon className={iconColor} size={20} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
