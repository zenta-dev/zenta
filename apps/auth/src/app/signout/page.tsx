"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOutPage() {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-bounce text-center text-4xl font-bold">
        Signing Out...
      </div>
    </div>
  );
}
