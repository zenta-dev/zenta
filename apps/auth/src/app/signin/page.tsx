import getUserSession from "@/lib/getUserSession";
import { Card, CardDescription, CardHeader, CardTitle } from "@packages/ui";
import SignInForm from "./SignInForm";

type SignInProps = {
  params: {};
  searchParams: {
    origin: string;
  };
};

export default async function SignInPage(props: SignInProps) {
  const {
    data: { session },
  } = await getUserSession();

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <SignInForm session={session} origin={props.searchParams.origin} />
      </Card>
    </main>
  );
}
