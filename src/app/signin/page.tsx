import { auth } from "@packages/auth";
import SignInForm from "./SignInForm";

type SignInProps = {
  params: {};
  searchParams: {
    origin: string;
  };
};

export default async function SignInPage(props: SignInProps) {
  const ses = await auth();
  return <SignInForm session={ses} origin={props.searchParams.origin} />;
}
