import { dev, env } from "@/env";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const createAuthServer = ({ cookies }: { cookies: any }) => {
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookies.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookies.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
      cookieOptions: {
        name: "sb",
        sameSite: "lax",
        secure: true,
        httpOnly: true,
        path: "/",
        domain: dev ? ".zenta.local" : ".zenta.dev",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    },
  );
};

export const getUserServer = async ({ cookies }: { cookies: any }) => {
  const sb = createAuthServer({ cookies });

  const { data, error } = await sb.auth.getUser();
  if (error) return null;

  return data;
};

export const getServerSession = async ({ cookies }: { cookies: any }) => {
  const sb = createAuthServer({ cookies });
  const { data, error } = await sb.auth.getUser();

  if (error) return null;

  return data;
};
