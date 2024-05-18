import { getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";

export default async function Page(): Promise<JSX.Element> {
  const ses = await getServerSession({ cookies: cookies() });

  const user = ses?.user.user_metadata;

  if (!user) {
    // redirect("/");
  }
  return (
    <main>
      {user?.full_name
        ? `Welcome back, ${user.full_name}`
        : "Sign in to continue"}
    </main>
  );
}
