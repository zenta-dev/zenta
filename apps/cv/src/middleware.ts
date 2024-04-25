import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const useSecureCookies = !!process.env.VERCEL_URL;
const csrfName = `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`;

export async function middleware(req: NextRequest) {
  console.log(
    "============>>> IS PROD: ",
    process.env.NODE_ENV === "production",
  );
  // =================== CSRF START ===================

  const { cookies } = req;
  const csrf = cookies.get(csrfName);
  const authUrl = useSecureCookies
    ? "https://auth.zenta.dev"
    : "http://zenta.local:3000";
  if (!csrf) {
    const res = await fetch(authUrl + "/api/auth/csrf");
    const json = await res.json();
    console.log("Middleware json", json);
    console.log("Middleware json.csrfToken", json.csrfToken);
    cookies.set(csrfName, json.csrfToken);
    console.log("Middleware csrfName", csrfName);
    console.log("Middleware cookies", cookies.get(csrfName));
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
    const url = new URL(`/redirect/auth`, req.url).toString();
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: req });
}

export const config = {
  matcher: "/dashboard/:path*",
};
