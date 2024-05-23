"use client";

import { dev } from "@/env";
import { AuthProviderType, User, useSupabaseClient } from "@packages/supabase";
import { Button, CardContent } from "@packages/ui";
import { useEffect } from "react";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInForm({
  data,
  callbackUri,
}: {
  data: User | undefined;
  callbackUri: string | undefined;
}) {
  const supabase = useSupabaseClient();
  useEffect(() => {
    if (callbackUri) {
      if (data) {
        const localcallbackUri = localStorage.getItem("callbackUri");

        window.location.href = localcallbackUri as string;
      } else {
        localStorage.setItem("callbackUri", callbackUri);
      }
    }
  }, []);

  const handleOauthLogin = (provider: AuthProviderType) => {
    const localcallbackUri = localStorage.getItem("callbackUri");
    const baseURL = dev
      ? "https://localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL;

    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${baseURL}/auth/callback?next=${localcallbackUri}`,
      },
    });
  };

  return (
    <CardContent className="flex flex-col gap-4">
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
  );
}
