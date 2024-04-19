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
    <div className="flex justify-center items-center h-screen">
      <div className="animate-bounce text-4xl font-bold text-center">
        Signing Out...
      </div>
    </div>
  );
}
