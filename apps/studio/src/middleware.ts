import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const useSecureCookies = !!process.env.VERCEL_URL;
const csrfName = `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`;

export async function middleware(req: NextRequest) {
  const { cookies } = req;
  const csrf = cookies.get(csrfName);
  const authUrl = useSecureCookies
    ? "https://auth.zenta.dev"
    : "http://zenta.local:3000";
  let csrfToken = "";
  if (!csrf) {
    const res = await fetch(authUrl + "/api/auth/csrf");
    const json = await res.json();
    csrfToken = json.csrfToken;
  }

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
    const res = NextResponse.rewrite(url, { request: req });
    if (csrfToken !== "") {
      res.cookies.set(csrfName, csrfToken, {
        sameSite: "lax",
        secure: useSecureCookies,
        path: "/",
        domain: useSecureCookies ? ".zenta.dev" : ".zenta.local",
      });
    }

    return res;
  }

  return NextResponse.next({ request: req });
}

export const config = {
  matcher: "/:path*",
};
