import { signOut } from "@packages/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await signOut({ redirect: false });
    console.log(res);
    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
    return new NextResponse("An error occured", { status: 500 });
  }
}
