"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  const router = useRouter();
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
