import PortfolioHeader from '../components/Dashboard/PortfolioHeader';
import StatsRow from '../components/Dashboard/StatsRow';
import AllocationChart from '../components/Dashboard/AllocationChart';
import TradeVolumeChart from '../components/Dashboard/TradeVolumeChart';
import RiskChart from '../components/Dashboard/RiskChart';
import TradeSummary from '../components/Dashboard/TradeSummary';
import RecentTrades from '../components/Dashboard/RecentTrades';

export default function DashboardPage() {
  return (
    <div className="space-y-section">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-display text-text-primary">
            Trading Dashboard
          </h1>
          <p className="mt-2 text-body text-text-secondary">
            Monitor portfolio performance, trades and AI risk analysis.
          </p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-pill border border-success/20 bg-success-muted px-4 py-2 transition-colors duration-200 hover:border-success/30">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success"></span>
          <span className="text-body font-medium text-success">System Live</span>
        </div>
      </div>

      <section id="portfolio" className="scroll-mt-20">
        <PortfolioHeader />
      </section>

      <section>
        <StatsRow />
      </section>

      <section id="risk-analysis" className="scroll-mt-20 grid grid-cols-1 gap-section lg:grid-cols-2">
        <AllocationChart />
        <TradeVolumeChart />
      </section>

      <section className="grid grid-cols-1 gap-section lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RiskChart />
        </div>
        <div className="lg:col-span-4">
          <RecentTrades />
        </div>
      </section>

      <section id="trades" className="scroll-mt-20">
        <TradeSummary />
      </section>
    </div>
  );
}
