import { env } from "@/env";
import { auth } from "@packages/auth";
import Link from "next/link";

export default async function Home() {
  const ses = await auth();
  console.log(ses);
  const dev = env.NODE_ENV === "development";
  const authLogin = () => {
    if (dev) {
      return "http://localhost:3000/signin?origin=cv.zenta.dev";
    } else {
      return "https://auth.zenta.dev/signin?origin=cv.zenta.dev";
    }
  };
  return (
    <main className="min-h">
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