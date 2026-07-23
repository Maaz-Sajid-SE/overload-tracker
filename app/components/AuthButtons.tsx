"use client";

import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-semibold transition-all"
    >
      Log in with GitHub
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 font-semibold transition-all"
    >
      Log Out
    </button>
  );
}