import { signIn } from "@packages/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await signIn("credentials", {
      redirect: false,
      email: body.email,
      password: body.password,
    });

    // console.log(res);

    return new NextResponse(JSON.stringify({ res }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
