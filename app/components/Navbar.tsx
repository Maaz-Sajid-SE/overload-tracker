import { LogoutButton } from './AuthButtons';

export default function Navbar() {
  return (
    <header className="h-16 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-slate-900 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      <h1 className="text-lg font-black uppercase tracking-widest text-emerald-400 md:hidden">Overload</h1>
      <div className="hidden md:block"></div>
      <div className="flex items-center gap-4 w-32">
        <LogoutButton />
      </div>
    </header>
  );
}