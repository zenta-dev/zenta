import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const useSecureCookies = !!process.env.VERCEL_URL;
const authUrl = useSecureCookies
  ? "https://auth.zenta.dev"
  : "https://zenta.local:3000";

export async function middleware(req: NextRequest) {
  const res = await fetch(authUrl + "/api/auth/session", {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });
  const ses = await res.json();
  if (!ses?.user) {
    const path = req.nextUrl.pathname;
    if (
      path.startsWith("/redirect") ||
      path.startsWith("/api") ||
      path.startsWith("/_next")
    ) {
      return NextResponse.next({ request: req });
    }

    const url = new URL(`/redirect/auth`, req.url).toString();
    return NextResponse.rewrite(url, { request: req });
  }

  return NextResponse.next({ request: req });
}

export const config = {
  matcher: "/:path*",
};
