import { auth } from "@packages/auth";
import { env } from "@packages/env";
import Link from "next/link";

export default async function Home() {
  const ses = await auth();

  const dev = env.NODE_ENV === "development";
  const authLogin = () => {
    if (dev) {
      return "http://zenta.local:3000/signin?origin=zenta.local:3002";
    } else {
      return "https://auth.zenta.dev/signin?origin=cv.zenta.dev";
    }
  };
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
            <Link href={authLogin()} className="rounded bg-blue-700 p-2">
              signIn
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
