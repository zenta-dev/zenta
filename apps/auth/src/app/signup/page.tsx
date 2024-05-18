import { Card, CardDescription, CardHeader, CardTitle } from "@packages/ui";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex h-[calc(100vh-15vh)] items-center justify-center">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Sign up to access your account</CardDescription>
        </CardHeader>
        <RegisterForm />
      </Card>
    </main>
  );
}
