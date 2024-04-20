"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@packages/auth";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  toast,
} from "@packages/ui";
import { LoginForm, LoginSchema } from "@packages/validators";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

export default function SignInForm({
  session,
  origin,
}: {
  session: Session | null;
  origin: string | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (origin) {
      if (session) {
        const localOrigin = localStorage.getItem("origin");
        window.location.href = localOrigin as string;
      } else {
        localStorage.setItem("origin", origin);
        console.log(localStorage.getItem("origin"));
      }
    }
  }, []);

  async function onSubmit(data: LoginForm) {
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log("res", res);

    if (res?.ok) {
      setLoading(false);
      console.log("Logged in successfully");
      toast.success("Logged in successfully");
      // window.location.href = "/studio";
      window.location.href = localStorage.getItem("origin") as string;
    } else {
      setLoading(false);
      console.log(res?.error);
      toast.error(res?.error);
    }
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup">
                  <Button
                    variant="link"
                    className="text-blue-500"
                    type="button"
                  >
                    Sign up
                  </Button>
                </Link>
              </p>

              <Button type="submit">
                {loading ? (
                  <AiOutlineLoading3Quarters className=" animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
              <div className="mx-auto flex items-center justify-center gap-2">
                <Separator className="w-full" />
                <p className="text-sm text-gray-500">Or</p>
                <Separator className="w-full" />
              </div>
              <Button
                variant="outline"
                onClick={() => signIn("discord")}
                type="button"
                className="flex items-center justify-center gap-2"
              >
                <FaDiscord />
                Sign in with Discord
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </main>
  );
}
