import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-semibold text-slate-100">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Performance metrics for <span className="font-medium text-emerald-400">{session?.user?.name || "Athlete"}</span>
        </p>
      </header>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Workouts</h3>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-4xl font-light text-slate-100">0</p>
            <span className="text-xs text-slate-500 mb-1">Lifetime</span>
          </div>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Volume</h3>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-4xl font-light text-slate-100">0 <span className="text-xl text-slate-500">kg</span></p>
            <span className="text-xs text-slate-500 mb-1">All exercises</span>
          </div>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Streak</h3>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-4xl font-light text-slate-100">0 <span className="text-xl text-slate-500">Days</span></p>
            <span className="text-xs text-slate-500 mb-1">Current</span>
          </div>
        </div>
      </div>
      
      {/* Data Visualization / Recent Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#111111] p-6 rounded-xl border border-slate-800 min-h-[400px]">
           <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-3 mb-4">Progression Chart</h3>
           <div className="h-full flex items-center justify-center">
              <p className="text-slate-600 text-sm italic">Insufficient data to generate progression graph.</p>
           </div>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 min-h-[400px]">
           <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-3 mb-4">Recent Logs</h3>
           <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <p className="text-slate-500 text-sm">No activity detected.</p>
           </div>
        </div>
      </div>
    </div>
  );
}