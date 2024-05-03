import { authUpdateSession } from "@packages/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res: NextResponse = await authUpdateSession(req);

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
