import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./components/AuthButtons";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-slate-200 font-sans selection:bg-emerald-500/30 relative flex flex-col">
      {/* Subtle Grid Background for Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Header */}
      <header className="w-full p-6 border-b border-slate-900/80 flex justify-between items-center relative z-10 backdrop-blur-sm bg-[#0A0A0A]/50">
        <div className="text-xl font-black tracking-widest text-emerald-400 uppercase flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Overload
        </div>
        <div className="text-xs font-semibold text-slate-500 hidden sm:block border border-slate-800 px-3 py-1.5 rounded-full bg-slate-900/50 tracking-wider">
          BUILD 1.0.0-BETA
        </div>
      </header>

      {/* Main Content Split Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-24 relative z-10 items-center">
        
        {/* Left Side: Hero Text & Features */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-wider uppercase rounded-full">
              Strength Analytics
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Data-driven <br/> <span className="text-emerald-400">progression.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed">
              Log your heavy compound lifts, analyze your volume, and shatter your personal records with precision engineering.
            </p>
          </div>

          {/* Feature List */}
          <ul className="space-y-4 pt-6 border-t border-slate-900">
            <li className="flex items-center gap-4 text-slate-300">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="font-medium">Automated 1-Rep Max estimations</span>
            </li>
            <li className="flex items-center gap-4 text-slate-300">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="font-medium">Total tonnage & volume tracking</span>
            </li>
            <li className="flex items-center gap-4 text-slate-300">
              <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="font-medium">Progressive overload visualization</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Auth Box */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-[#111111]/80 backdrop-blur-xl border border-slate-800 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
            
            {/* Decorative subtle orb inside the box */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-600/10 rounded-full blur-[50px] pointer-events-none"></div>

            <div className="relative z-10">
              {session ? (
                <div className="space-y-6">
                  <div className="pb-6 border-b border-slate-800">
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">Secure Session Active</p>
                    <p className="text-2xl font-bold text-slate-100">{session.user?.name}</p>
                    <p className="text-sm text-slate-500 truncate">{session.user?.email}</p>
                  </div>
                  <div className="space-y-4">
                    <Link 
                      href="/dashboard" 
                      className="w-full px-6 py-3.5 text-slate-950 bg-emerald-500 rounded-lg hover:bg-emerald-400 font-bold tracking-wide transition-all flex items-center justify-center gap-2"
                    >
                      Access Dashboard
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                    <LogoutButton />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-100">Welcome Back</h2>
                    <p className="text-sm text-slate-400">Authenticate to access your dashboard.</p>
                  </div>
                  
                  <LoginButton />
                  
                  <div className="pt-4 border-t border-slate-800/80">
                    <p className="text-[11px] text-center text-slate-500 uppercase tracking-wider font-medium">
                      Enterprise-grade security via GitHub
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}