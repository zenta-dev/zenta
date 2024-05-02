import { env } from "@/env";
import { createBrowserClient } from "@supabase/ssr";

export const createAuthBrowser = () => {
  const sb = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

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
