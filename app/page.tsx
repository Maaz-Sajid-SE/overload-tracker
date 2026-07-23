import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"; // 1. Import the config
import { LoginButton, LogoutButton } from "./components/AuthButtons";

export default async function Home() {
  // 2. Pass the config so the server knows to look in the database!
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="max-w-xl text-center space-y-6 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Overload Tracker
        </h1>
        
        {session ? (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Welcome back, <span className="font-bold text-blue-600">{session.user?.name}</span>!
            </p>
            <p className="text-sm text-gray-500 pb-4">
              Your account is successfully linked to your database.
            </p>
            <LogoutButton />
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