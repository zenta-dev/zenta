import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const useSecureCookies = !!process.env.VERCEL_URL;
  const csrfName = `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`;

  const nextRes = NextResponse.next();

  const { cookies } = req;
  const csrf = cookies.get(csrfName);
  if (csrf) {
    return nextRes;
  }

  const authUrl = useSecureCookies
    ? "https://auth.zenta.dev"
    : "http://zenta.local:3000";
  const res = await fetch(authUrl + "/api/auth/csrf");
  const json = await res.json();

  nextRes.cookies.set("authjs.csrf-token", json.csrfToken, {
    sameSite: "lax",
    httpOnly: true,
    secure: useSecureCookies,
    path: "/",
    domain: useSecureCookies ? ".zenta.dev" : ".zenta.local",
  });

  return nextRes;
}
