import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-slate-200 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}