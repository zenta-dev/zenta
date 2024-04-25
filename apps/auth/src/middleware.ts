import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const res = NextResponse.next();
  const csrfCookies = cookies.get("X-CSRF-Token");
  if (csrfCookies) {
    console.log("CSRF Token is set");
    return res;
  }
  const dev = process.env.NODE_ENV === "development";
  const url = dev ? "https://zenta.local:3000" : "https://auth.zenta.dev";

  const csrf = await fetch(url + "/api/auth/csrf");
  const json = await csrf.json();
  const csrfToken = json.csrfToken;
  res.cookies.set("X-CSRF-Token", csrfToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    domain: dev ? ".zenta.local" : ".zenta.dev",
    secure: true,
  });

  return res;
}
export const config = {
  matcher: "/:path*",
};
