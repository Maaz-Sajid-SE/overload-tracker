import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111111] border-r border-slate-900 h-full hidden md:flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-900">
        <h2 className="text-lg font-black uppercase tracking-widest text-emerald-400">Overload</h2>
      </div>
      <nav className="flex flex-col gap-1 px-3 mt-6 flex-1">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
        <Link href="/dashboard" className="px-3 py-2 rounded-md bg-slate-800/50 text-emerald-400 border border-slate-700/50 font-medium text-sm">
          Overview
        </Link>
        <Link href="/dashboard/workouts" className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-slate-200 text-slate-400 transition-colors font-medium text-sm">
          Log Workout
        </Link>
        <Link href="/dashboard/analytics" className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-slate-200 text-slate-400 transition-colors font-medium text-sm">
          Analytics
        </Link>
      </nav>
    </aside>
  );
}