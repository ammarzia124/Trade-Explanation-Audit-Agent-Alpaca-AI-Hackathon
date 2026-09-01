import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PortfolioHeader from "./components/PortfolioHeader";
import StatsRow from "./components/StatsRow";
import TradeList from "./components/TradeList";
import AllocationChart from "./components/AllocationChart";
import TradeVolumeChart from "./components/TradeVolumeChart";
import RiskBreakdownChart from "./components/RiskBreakdownChart";
import AuditLogTable from "./components/AuditLogTable";
import ChatPanel from "./components/Chatbot/ChatPanel";

function App() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white">

      {/* Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Dashboard */}
        <main className="min-w-0 flex-1 p-6 lg:p-8">

          {/* Page Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Trading Dashboard
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Monitor portfolio performance, trades and AI risk analysis.
              </p>
            </div>

            {/* Live Indicator */}
            <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-800 bg-[#161B22] px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>

              <span className="text-sm font-medium text-gray-300">
                System Live
              </span>
            </div>

          </div>


          {/* Portfolio */}
          <section id="portfolio" className="mb-8 scroll-mt-6">

            <PortfolioHeader />

          </section>


          {/* Stats */}
          <section className="mb-8">

            <StatsRow />

          </section>


          {/* Risk Analysis Charts */}
          <section
            id="risk-analysis"
            className="mb-8 scroll-mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2"
          >

            <AllocationChart />

            <TradeVolumeChart />

          </section>


          {/* Risk + Trade List */}
          <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* Risk Breakdown */}
            <div className="xl:col-span-1">

              <RiskBreakdownChart />

            </div>


            {/* Trade List */}
            <div
              id="trades"
              className="scroll-mt-6 xl:col-span-2"
            >

              <TradeList />

            </div>

          </section>


          {/* Audit Log */}

          <section id="audit-logs">
            <AuditLogTable />
          </section>

          <ChatPanel />

          <footer></footer>
          {/* Footer */}
          <footer className="mt-10 border-t border-gray-800 pt-5 text-center">

            <p className="text-xs text-gray-600">
              TradeGuard AI • AI-powered trade monitoring & audit system
            </p>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default App;