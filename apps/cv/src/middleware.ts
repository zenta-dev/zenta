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
    const url = new URL(`/redirect/auth`, req.url).toString();
    return NextResponse.rewrite(url, { request: req });
  }

  return NextResponse.next({ request: req });
}

export const config = {
  matcher: "/dashboard/:path*",
};
