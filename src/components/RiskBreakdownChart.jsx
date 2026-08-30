import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "LOW", value: 70 },
  { name: "MEDIUM", value: 20 },
  { name: "HIGH", value: 10 },
];

const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

function RiskBreakdownChart() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">

      <h2 className="text-lg font-semibold text-white">
        Risk Breakdown
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Trade risk distribution
      </p>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#161B22",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default RiskBreakdownChart;