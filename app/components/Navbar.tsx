import { LogoutButton } from './AuthButtons';

export default function Navbar() {
  return (
    <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      <h1 className="text-xl font-bold text-gray-900 md:hidden">Overload</h1>
      {/* Spacer for desktop */}
      <div className="hidden md:block"></div>
      <div className="flex items-center gap-4">
        <LogoutButton />
      </div>
    </header>
  );
}