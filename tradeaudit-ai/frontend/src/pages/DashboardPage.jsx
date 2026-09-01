import TradeSummary from '../components/Dashboard/TradeSummary';
import RiskChart from '../components/Dashboard/RiskChart';
import RecentTrades from '../components/Dashboard/RecentTrades';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <TradeSummary />
      <RiskChart />
      <RecentTrades />
    </div>
  );
}
