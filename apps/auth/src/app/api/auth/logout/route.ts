import { signOut } from "@packages/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await signOut({ redirect: false });
    console.log(res);
    const nextRes = new NextResponse(JSON.stringify(res), {
      status: 200,
    });
    nextRes.headers.set("Content-Type", "application/json");
    return nextRes;
  } catch (e) {
    console.log(e);
    return new NextResponse("An error occured", { status: 500 });
  }
}
