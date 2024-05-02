import { getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const res = await getServerSession({ cookies: cookies() });

  if (!res || !res.user) {
    return redirect("/login");
  }

  const user = res.user;

  return (
    <section className="bg-ct-blue-600  min-h-screen pt-20">
      <div className="bg-ct-dark-100 mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md">
        <div>
          <p className="mb-3 text-center text-5xl font-semibold">
            Profile Page
          </p>
          <div className="mt-8">
            <p className="mb-3">Id: {user.id}</p>
            <p className="mb-3">Role: {user.role}</p>
            <p className="mb-3">Email: {user.email}</p>
            <p className="mb-3">Provider: {user.app_metadata["provider"]}</p>
            <p className="mb-3">Created At: {user.created_at}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
