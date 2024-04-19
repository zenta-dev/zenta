import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path === "/") {
    return NextResponse.next();
  }
  const rawToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });

  const isStudio = path.includes("/studio");
  const isSignIn = path.includes("/auth/signin");
  const isSignUp = path.includes("/auth/signup");
  const isSignOut = path.includes("/auth/signout");

  const headers = new Headers(req.headers);
  headers.set("x-pathname", req.nextUrl.pathname);
  if (isSignOut && !rawToken) {
    return NextResponse.rewrite(new URL("/auth/signin", req.url).toString());
  }
  if (!rawToken && isStudio) {
    return NextResponse.rewrite(new URL("/auth/signin", req.url).toString());
  }

  if (rawToken && isSignIn) {
    return NextResponse.rewrite(new URL("/studio", req.url).toString());
  }

  if (rawToken && isSignUp) {
    return NextResponse.rewrite(new URL("/studio", req.url).toString());
  }

  const res = NextResponse.next();
  res.headers.set(`x-middleware-cache`, `no-cache`);
  res.headers.set(`x-middleware-path`, path);
  console.log("[MIDDLEWARE] path", path);
  return res;
}

export const config = { matcher: ["/studio/:path*", "/auth/:path*"] };
