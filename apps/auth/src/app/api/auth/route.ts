import { auth } from "@packages/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }
    const newSession = removeKeyValues(session, [
      "sessionToken",
      "accessToken",
      "refreshToken",
    ]);
    newSession.user = removeKeyValues(newSession.user, ["password"]);
    return NextResponse.json({
      success: true,
      message: "Authorized",
      session: newSession,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An exception occured",
    });
  }
}

function removeKeyValues(obj: any, keys: string[]) {
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  });
  return result;
}
