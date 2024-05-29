import { authUpdateSession, getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res: NextResponse = await authUpdateSession(req);

  const ses = await getServerSession({ cookies: cookies() });

  if (!ses) {
    const url = new URL(`/redirect/auth`, req.url).toString();
    return NextResponse.rewrite(url, { request: req });
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
