import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./components/AuthButtons";
import Link from "next/link";

export default async function Home() {
  // Securely fetch the user's session from the server
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="max-w-xl text-center space-y-6 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Overload Tracker
        </h1>
        
        {session ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700 pb-2">
              Welcome back, <span className="font-bold text-blue-600">{session.user?.name}</span>!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/dashboard" 
                className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 font-semibold transition-all flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
              <LogoutButton />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-600 pb-4">
              Please log in to track your strength training and progressive overload.
            </p>
            <LoginButton />
          </div>
        )}
      </div>
    </main>
  );
}