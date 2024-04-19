"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginForm, LoginSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      toast.success("Logged in successfully");
      window.location.href = "/studio";
    } else {
      setLoading(false);
      toast.error(res?.error);
    }
  }

  return (
    <main className="flex items-center justify-center h-screen">
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

              <p className="text-sm text-center">
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
            </CardContent>
          </form>
        </Form>
      </Card>
    </main>
  );
}
