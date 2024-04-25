import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const useSecureCookies = !!process.env.VERCEL_URL;
const csrfName = `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`;

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // =================== CSRF START ===================
  const { cookies } = req;
  const csrf = cookies.get(csrfName);
  const authUrl = useSecureCookies
    ? "https://auth.zenta.dev"
    : "http://zenta.local:3000";
  if (!csrf) {
    const res = await fetch(authUrl + "/api/auth/csrf");
    const json = await res.json();
    cookies.set(csrfName, json.csrfToken);
  }

  // =================== CSRF END ===================

  // =================== AUTH START ===================
  // if url is /dashboard, check if user is logged in
  const res = await fetch(authUrl + "/api/auth/session", {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });
  const ses = await res.json();
  if (!ses?.user) {
    const path = req.nextUrl.pathname;
    console.log("Middleware path", path);
    if (
      path.startsWith("/redirect") ||
      path.startsWith("/api") ||
      path.startsWith("/_next")
    ) {
      return NextResponse.next({ request: req });
    }

    const url = new URL(`/redirect/auth`, req.url).toString();
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: req });
}

export const config = {
  matcher: "/:path*",
};
