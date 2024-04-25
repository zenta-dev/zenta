import { LoginButton } from "@/components/LoginButton";
import { auth } from "@packages/auth";
import { env } from "@packages/env";

export default async function Home() {
  const ses = await auth();

  return (
    <main>
      <h1>CV App</h1>
      <div>
        {ses?.user ? (
          <div>
            <h1>Logged in as {ses.user.email}</h1>
          </div>
        ) : (
          <div>
            <h1>Not logged in</h1>
            <LoginButton />
          </div>
        )}
      </div>
    </main>
  );
}
