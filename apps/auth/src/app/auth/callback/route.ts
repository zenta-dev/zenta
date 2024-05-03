import { dev, env } from "@/env";
import { createAuthServer } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const baseURL = dev ? "https://zenta.local:3000" : env.NEXT_PUBLIC_APP_URL;
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "";

    if (code) {
      const supabase = createAuthServer({ cookies: cookies() });

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      console.log("[STUDIO APP] Auth code exchange error", error);
      if (!error) {
        return NextResponse.redirect(`${baseURL}/${next}`);
      }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${baseURL}/auth/auth-code-error`);
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(`${baseURL}/auth/auth-code-error`);
  }
}
