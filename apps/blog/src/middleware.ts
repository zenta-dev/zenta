// import authConfig from "@packages/auth";
// import NextAuth from "next-auth";
// export const { auth: middleware } = NextAuth(authConfig);

import { env } from "@packages/env";
import { NextRequest, NextResponse } from "next/server";

const useSecureCookies = !!process.env.VERCEL_URL;
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path === "/") {
    return NextResponse.next();
  }

  const url = env.NEXT_PUBLIC_AUTH_APP_URL + "/api/auth";
  const csrfToken = req.cookies.get(
    `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`
  );
  const session = req.cookies.get(
    `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`
  );

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `${csrfToken?.name}=${csrfToken?.value}; ${session?.name}=${session?.value}`,
    },
  });
  const json = await res.json();
  if (!json.success) {
    const url = new URL("/auth", req.url).toString();
    console.log("AUTH", url);
    return NextResponse.redirect(url, { status: 302 });
  }

  return NextResponse.next();
}

export const config = { matcher: ["/studio/:path*"] };
