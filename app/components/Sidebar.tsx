"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  // Helper function to dynamically apply active/inactive styles
  const getLinkStyles = (path: string) => {
    const isActive = pathname === path;
    
    return `px-3 py-2 rounded-md font-medium text-sm transition-colors border ${
      isActive
        ? "bg-slate-800/50 text-emerald-400 border-slate-700/50" // Active state
        : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200" // Inactive state
    }`;
  };

  return (
    <aside className="w-64 bg-[#111111] border-r border-slate-900 h-full hidden md:flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-900">
        <h2 className="text-lg font-black uppercase tracking-widest text-emerald-400">Overload</h2>
      </div>
      <nav className="flex flex-col gap-1 px-3 mt-6 flex-1">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
        
        <Link href="/dashboard" className={getLinkStyles("/dashboard")}>
          Overview
        </Link>
        
        <Link href="/dashboard/workouts" className={getLinkStyles("/dashboard/workouts")}>
          Log Workout
        </Link>
        
        <Link href="/dashboard/analytics" className={getLinkStyles("/dashboard/analytics")}>
          Analytics
        </Link>
        
        <Link href="/dashboard/settings" className={getLinkStyles("/dashboard/settings")}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}