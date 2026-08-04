"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  maxWeight: number;
}

interface ProgressionChartProps {
  data: ChartData[];
  exerciseName: string;
}

export default function ProgressionChart({ data, exerciseName }: ProgressionChartProps) {
  // 🛡️ The Empty State: If the user hasn't logged this exercise yet
  if (!data || data.length === 0) {
    return (
      <div className="h-72 w-full flex flex-col items-center justify-center bg-[#111111] rounded-xl border border-slate-800">
        <svg className="w-12 h-12 text-slate-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        <p className="text-slate-500 text-sm tracking-wide">Log more {exerciseName} sessions to unlock analytics.</p>
      </div>
    );
  }

  // 📈 The Rendered Chart
  return (
    <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 w-full h-80 flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
          {exerciseName} Progression
        </h3>
        <span className="text-xs text-slate-500">Max Weight (kg)</span>
      </div>
      
      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px" }}
              itemStyle={{ color: "#10b981", fontWeight: "bold" }}
              labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
            />
            <Line
              type="monotone"
              dataKey="maxWeight"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
              activeDot={{ r: 6, stroke: "#047857", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}