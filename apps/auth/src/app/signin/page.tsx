import { getServerSession } from "@packages/supabase";
import { Card, CardDescription, CardHeader, CardTitle } from "@packages/ui";
import { cookies } from "next/headers";
import SignInForm from "./SignInForm";

type SignInProps = {
  params: {};
  searchParams: {
    callbackUri: string;
  };
};

export default async function SignInPage(props: SignInProps) {
  const res = await getServerSession({ cookies: cookies() });

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <SignInForm
          data={res?.user}
          callbackUri={props.searchParams.callbackUri}
        />
      </Card>
    </main>
  );
}
