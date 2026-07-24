import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full hidden md:block shrink-0">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-extrabold uppercase tracking-widest text-blue-500">Overload</h2>
      </div>
      <nav className="flex flex-col gap-2 px-4 mt-6">
        <Link href="/dashboard" className="px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition-colors font-medium">
          Overview
        </Link>
        <Link href="/dashboard/workouts" className="px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition-colors font-medium">
          Log Workout
        </Link>
        <Link href="/dashboard/analytics" className="px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition-colors font-medium">
          Analytics
        </Link>
      </nav>
    </aside>
  );
}