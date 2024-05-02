import { getServerSession } from "@packages/supabase";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
  4;
  const ses = await getServerSession();
  console.log("[STUDIO APP] ses", ses);
  const user = ses?.user.user_metadata;

  if (!user) {
    redirect("/");
  }
  return (
    <main>
      {user.full_name
        ? `Welcome back, ${user.full_name}`
        : "Sign in to continue"}
    </main>
  );
}
