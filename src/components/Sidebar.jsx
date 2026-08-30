import {
  LayoutDashboard,
  TrendingUp,
  BriefcaseBusiness,
  ShieldAlert,
  FileText,
} from "lucide-react";

function Sidebar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-gray-800 bg-[#0D1117] lg:block">

      {/* Sidebar Header */}
      <div className="border-b border-gray-800 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Navigation
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-4">

        {/* Dashboard */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex w-full items-center gap-3 rounded-lg bg-blue-600/10 px-4 py-3 text-left text-sm font-medium text-blue-400 transition hover:bg-blue-600/20"
        >
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        {/* Trades */}
        <button
          onClick={() => scrollToSection("trades")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-[#161B22] hover:text-white"
        >
          <TrendingUp size={19} />
          Trades
        </button>

        {/* Portfolio */}
        <button
          onClick={() => scrollToSection("portfolio")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-[#161B22] hover:text-white"
        >
          <BriefcaseBusiness size={19} />
          Portfolio
        </button>

        {/* Risk Analysis */}
        <button
          onClick={() => scrollToSection("risk-analysis")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-[#161B22] hover:text-white"
        >
          <ShieldAlert size={19} />
          Risk Analysis
        </button>

        {/* Audit Logs */}
        <button
          onClick={() => scrollToSection("audit-logs")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-[#161B22] hover:text-white"
        >
          <FileText size={19} />
          Audit Logs
        </button>

      </nav>

      {/* Bottom Info */}
      <div className="mx-4 mt-6 rounded-lg border border-gray-800 bg-[#161B22] p-4">
        <p className="text-xs font-medium text-gray-300">
          TradeGuard AI
        </p>

        <p className="mt-1 text-xs text-gray-600">
          AI Trade Monitoring
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;