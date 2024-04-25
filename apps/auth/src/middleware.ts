import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const useSecureCookies = process.env.NODE_ENV === "production";
  const csrfName = `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`;

  const nextRes = NextResponse.next();

  const authUrl = useSecureCookies
    ? "https://auth.zenta.dev"
    : "http://zenta.local:3000";
  const res = await fetch(authUrl + "/api/auth/csrf");
  const json = await res.json();

  nextRes.cookies.set(csrfName, json.csrfToken, {
    httpOnly: true,
    sameSite: useSecureCookies ? "none" : "lax",
    path: "/",
    domain: useSecureCookies ? ".zenta.dev" : ".zenta.local",
    secure: useSecureCookies,
  });

  return nextRes;
}

export const config = {
  match: "/:path*",
};
