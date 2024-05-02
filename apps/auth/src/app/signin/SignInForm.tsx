"use client";

import useSupabaseClient from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthProviderType, Session } from "@packages/supabase";
import {
  Button,
  CardContent,
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword } from "./_actions";
import { LoginSchema, LoginSchemaType } from "./_schema";

export default function SignInForm({
  session,
  origin,
}: {
  session: Session | null;
  origin: string | undefined;
}) {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginSchemaType>({
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
      }
    }
  }, []);

  async function onSubmit(data: LoginSchemaType) {
    setLoading(true);
    const res = await signInWithEmailAndPassword(data);
    const json = JSON.parse(res);

    if (json?.error) {
      setLoading(false);
      toast.error("Invalid credentials");
    } else {
      setLoading(false);
      toast.success("Logged in successfully");
      window.location.href = localStorage.getItem("origin") as string;
    }
  }

  const handleOauthLogin = (provider: AuthProviderType) => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <Button variant="link" className="text-blue-500" type="button">
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
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => handleOauthLogin("google")}
              type="button"
              className="flex items-center justify-center gap-2"
            >
              <FaGoogle />
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOauthLogin("github")}
              type="button"
              className="flex items-center justify-center gap-2"
            >
              <FaGithub />
              Sign in with GitHub
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOauthLogin("discord")}
              type="button"
              className="flex items-center justify-center gap-2"
            >
              <FaDiscord />
              Sign in with Discord
            </Button>
          </div>
        </CardContent>
      </form>
    </Form>
  );
}
