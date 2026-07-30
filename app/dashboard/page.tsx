import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient, Workout, Set } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);

  // 1. Identify the User
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });


  // Define a type that combines a Workout with its nested Sets
  type WorkoutWithSets = Workout & { sets: Set[] };

  let totalWorkouts = 0;
  let totalVolume = 0;
  let recentLogs: WorkoutWithSets[] = [];

  // 2. Fetch the Data
  if (user) {
    // Count total lifetime workouts
    totalWorkouts = await prisma.workout.count({
      where: { userId: user.id },
    });

    // Fetch the 5 most recent workouts, including their nested sets
    recentLogs = await prisma.workout.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' }, // Sort by newest first
      take: 5,
      include: { sets: true },
    });

    // Calculate total volume (Weight x Reps across all sets ever logged)
    const allSets = await prisma.set.findMany({
      where: { workout: { userId: user.id } },
    });
    totalVolume = allSets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
  }

  return (
    <div className="space-y-8">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-semibold text-slate-100">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Performance metrics for <span className="font-medium text-emerald-400">{session?.user?.name || "Athlete"}</span>
        </p>
      </header>

      {/* Dynamic KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Workouts</h3>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-4xl font-light text-slate-100">{totalWorkouts}</p>
            <span className="text-xs text-slate-500 mb-1">Lifetime</span>
          </div>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Volume</h3>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-4xl font-light text-slate-100">{totalVolume.toLocaleString()} <span className="text-xl text-slate-500">kg</span></p>
            <span className="text-xs text-slate-500 mb-1">All exercises</span>
          </div>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Streak</h3>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-4xl font-light text-slate-100">1 <span className="text-xl text-slate-500">Days</span></p>
            <span className="text-xs text-slate-500 mb-1">Current</span>
          </div>
        </div>
      </div>

      
      
      {/* Data Visualization / Recent Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#111111] p-6 rounded-xl border border-slate-800 min-h-96">
           <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-3 mb-4">Progression Chart</h3>
           <div className="h-full flex items-center justify-center">
              <p className="text-slate-600 text-sm italic">Insufficient data to generate progression graph.</p>
           </div>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-xl border border-slate-800 min-h-96">
           <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-3 mb-4">Recent Logs</h3>
           <div className="space-y-4">
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-[#0A0A0A] rounded-lg border border-slate-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-slate-200">{log.title}</p>
                      <p className="text-xs text-emerald-400">{new Date(log.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-xs text-slate-500">
                      {log.sets.length} {log.sets.length === 1 ? 'Set' : 'Sets'} Logged
                    </p>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 pt-12">
                  <p className="text-slate-500 text-sm">No activity detected.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}