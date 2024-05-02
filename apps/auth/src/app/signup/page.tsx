import { Card, CardDescription, CardHeader, CardTitle } from "@packages/ui";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle>Register</CardTitle>
          <CardDescription>Sign up to access your account</CardDescription>
        </CardHeader>
        <RegisterForm />
      </Card>
    </main>
  );
}
