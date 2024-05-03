import { dev, env } from "@/env";
import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";

export const createAuthBrowser = () => {
  const sb = createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        sameSite: "lax",
        secure: true,
        path: "/",
        domain: dev ? ".zenta.local" : ".zenta.dev",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    },
  );

  return sb;
};
export const getUserBrowser = async () => {
  const sb = createAuthBrowser();

  const { data, error } = await sb.auth.getUser();
  if (error) return null;

  return data;
};

export const getBrowserSession = async () => {
  const sb = createAuthBrowser();
  const { data, error } = await sb.auth.getUser();

  if (error) return null;

  return data;
};

export function useSupabaseClient() {
  return useMemo(createAuthBrowser, []);
}
