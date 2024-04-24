import { register } from "@packages/auth";
import { db } from "@packages/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const find = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (find) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 },
      );
    }

    const user = register({
      name,
      email,
      password,
    });

    if (!user) {
      return defaultErrorResponse();
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return defaultErrorResponse();
  }
}

function defaultErrorResponse() {
  return NextResponse.json(
    {
      success: false,
      message: "An error occurred while creating the user",
    },
    { status: 500 },
  );
}
