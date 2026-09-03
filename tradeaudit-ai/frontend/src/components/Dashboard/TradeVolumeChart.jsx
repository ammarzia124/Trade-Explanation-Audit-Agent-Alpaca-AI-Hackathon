import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useOrdersQuery } from '../../hooks/useOrdersQuery';
import SkeletonCard from '../common/SkeletonCard';
import ErrorCard from '../common/ErrorCard';
import EmptyState from '../common/EmptyState';

export default function TradeVolumeChart() {
  const { data: orders, isLoading, error, refetch } = useOrdersQuery();

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
        <h2 className="section-title mb-4">Trade Volume</h2>
        <ErrorCard message={error.message} onRetry={refetch} />
      </div>
    );
  }

  const hourlyData = {};
  (orders || []).forEach((order) => {
    if (!order.submitted_at && !order.created_at) return;
    const date = new Date(order.submitted_at || order.created_at);
    const hour = date.getHours();
    const price = Number(order.filled_avg_price || order.limit_price || order.price || 0);
    const qty = Number(order.qty || 0);
    const amount = price * qty;
    const label = `${hour.toString().padStart(2, '0')}:00`;
    if (!hourlyData[label]) hourlyData[label] = 0;
    hourlyData[label] += amount;
  });

  const chartData = Object.entries(hourlyData)
    .map(([hour, amount]) => ({ hour, amount }))
    .sort((a, b) => a.hour.localeCompare(b.hour));

  return (
    <article className="card" aria-label="Trade volume by hour chart">
      <div>
        <h2 className="section-title">Trade Volume</h2>
        <p className="section-subtitle">Trading activity by hour</p>
      </div>

      {chartData.length === 0 ? (
        <EmptyState
          title="No trade volume available"
          description="Trade activity will appear here when orders are placed."
        />
      ) : (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="hour"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                tickLine={false}
              />
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
              <Bar
                dataKey="amount"
                name="Trade Volume"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
