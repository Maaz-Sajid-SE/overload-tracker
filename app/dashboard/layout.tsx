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
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        {/* The active page content will be injected into this main tag */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}