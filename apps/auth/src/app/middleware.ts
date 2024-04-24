import { auth } from "@packages/auth";
import { NextResponse } from "next/server";

const useSecureCookies = !!process.env.VERCEL_URL;

export default auth(async (req) => {
  const cookies = req.cookies;
  const csrfToken = cookies.get(
    `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
  );

  if (!csrfToken) {
    const url = useSecureCookies
      ? "https://auth.zenta.dev/api/auth/csrf"
      : "http://zenta.local:3000/api/auth/csrf";
    const newCsrfToken = await fetch(url);
    const json = await newCsrfToken.json();
    cookies.set(
      `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
      json.csrfToken,
    );

    return NextResponse.redirect(req.url);
  }

  return NextResponse.next();
});
