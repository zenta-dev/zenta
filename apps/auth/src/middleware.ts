import { authUpdateSession } from "@packages/supabase";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await authUpdateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
