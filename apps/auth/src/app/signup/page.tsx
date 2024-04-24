"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  toast,
} from "@packages/ui";
import { RegisterForm, RegisterSchema } from "@packages/validators";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterForm) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (json.success) {
      setLoading(false);
      const origin = localStorage.getItem("origin");
      toast.success(json.message);
      window.location.href = `/signin?origin=${origin}`;
    } else {
      setLoading(false);
      toast.error(json.message);
    }
  }
  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle>Register</CardTitle>
          <CardDescription>Sign up to access your account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your email" {...field} />
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
                        placeholder="Input your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-center text-sm">
                Already have an account?
                <Link href={`/signin`}>
                  <Button
                    variant="link"
                    className="text-blue-500"
                    type="button"
                  >
                    Sign in
                  </Button>
                </Link>
              </p>
              <Button type="submit">
                {loading ? (
                  <AiOutlineLoading3Quarters className=" animate-spin" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
    </main>
  );
}
