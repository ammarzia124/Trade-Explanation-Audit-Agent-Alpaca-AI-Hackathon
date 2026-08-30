import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: "9 AM", amount: 3200 },
  { hour: "10 AM", amount: 10500 },
  { hour: "11 AM", amount: 6800 },
  { hour: "12 PM", amount: 4200 },
  { hour: "1 PM", amount: 7500 },
  { hour: "2 PM", amount: 5100 },
  { hour: "3 PM", amount: 8900 },
];

function TradeVolumeChart() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#161B22] p-5">
      
      <h2 className="text-lg font-semibold text-white">
        Trade Volume
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Trading amount by hour
      </p>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="hour"
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#161B22",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Volume"]}
            />

            <Bar
              dataKey="amount"
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default TradeVolumeChart;