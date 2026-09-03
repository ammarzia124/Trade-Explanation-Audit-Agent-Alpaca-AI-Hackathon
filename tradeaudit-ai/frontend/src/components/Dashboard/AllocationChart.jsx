import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { usePositionsQuery } from '../../hooks/usePositionsQuery';
import SkeletonCard from '../common/SkeletonCard';
import ErrorCard from '../common/ErrorCard';
import EmptyState from '../common/EmptyState';

const CHART_COLORS = ['#3B82F6', '#22C55E', '#EAB308', '#EF4444', '#A855F7', '#EC4899', '#06B6D4', '#F97316'];

function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-micro text-text-secondary">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function AllocationChart() {
  const { data: positions, isLoading, error, refetch } = usePositionsQuery();

  if (isLoading) {
    return (
      <div className="card">
        <SkeletonCard height="h-64" className="border-0 bg-transparent p-0" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="section-title mb-4">Portfolio Allocation</h2>
        <ErrorCard message={error.message} onRetry={refetch} />
      </div>
    );
  }

  const chartData = (positions || [])
    .map((position) => ({
      name: position.symbol,
      value: Math.abs(Number(position.market_value || position.marketValue || 0)),
    }))
    .filter((item) => item.value > 0);

  return (
    <article className="card" aria-label="Portfolio allocation chart">
      <div>
        <h2 className="section-title">Portfolio Allocation</h2>
        <p className="section-subtitle">Current portfolio positions</p>
      </div>

      {chartData.length === 0 ? (
        <EmptyState
          title="No open positions"
          description="Portfolio allocation will appear here when you have open positions."
        />
      ) : (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
                strokeWidth={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${Number(value).toLocaleString()}`}
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                  fontSize: '12px',
                }}
              />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
