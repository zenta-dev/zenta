import { auth } from "@packages/auth";

export default async function Home() {
  const ses = await auth();
  console.log(ses);
  return (
    <main>
      <h1>Test App</h1>
      <div>
        {ses?.user ? (
          <div>
            <h1>Logged in as {ses.user.email}</h1>
          </div>
        ) : (
          <div>
            <h1>Not logged in</h1>
          </div>
        )}
      </div>
    </main>
  );
}
