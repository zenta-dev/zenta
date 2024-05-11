import { env } from "@/env";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const preferredRegion = ["sin1", "syd1", "hnd1"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paramsToSign } = body;

    cloudinary.config({
      cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
    });

    console.log("Signing params", paramsToSign);

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      env.CLOUDINARY_API_SECRET,
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "An error occurred while signing the request" },
      { status: 500 },
    );
  }
}
