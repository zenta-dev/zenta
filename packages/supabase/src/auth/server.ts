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
        domain: dev ? "localhost" : ".zenta.dev",
        path: "/",
        sameSite: "lax",
        secure: true,
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
