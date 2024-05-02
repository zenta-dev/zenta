import { createAuthServer } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const knownOrigins = [
  "studio.zenta.dev",
  "auth.zenta.dev",
  "cv.zenta.dev",
  "zenta.dev",
];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "";
  console.log("code", code);
  console.log("next", next);

  if (code) {
    const supabase = createAuthServer({ cookies: cookies() });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // match the known origins with next to redirect the user

      console.log("redirecting to", knownOrigins.includes(next));
      return NextResponse.redirect(`${origin}/${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
