import { signOut } from "next-auth/react";

export default async function SignOutPage() {
  await signOut();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-bounce text-center text-4xl font-bold">
        Signing Out...
      </div>
    </div>
  );
}
