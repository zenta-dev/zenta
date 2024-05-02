import { env } from "@/env";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createAuthServer = () => {
  const cookieStore = cookies();

  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {}
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {}
      },
    },
  });
};

export const getUserServer = async () => {
  const sb = createAuthServer();

  const { data, error } = await sb.auth.getUser();
  if (error) return null;

  return data;
};

export const getServerSession = async () => {
  "use server";
  const sb = createAuthServer();
  const { data, error } = await sb.auth.getUser();

  if (error) return null;

  return data;
};
