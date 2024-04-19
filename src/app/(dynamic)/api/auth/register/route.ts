import { AuthAdapter, prisma } from "@/lib/server";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { AdapterUser } from "next-auth/adapters";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, name, email, password } = body;

    const find = await prisma.user.findUnique({
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
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS || "10")
    );

    if (AuthAdapter.createUser) {
      const req: AdapterUser = {
        id: randomUUID(),
        name,
        email,
        password: hash,
        image: image,
        emailVerified: null,
      };
      const user = await AuthAdapter.createUser(req);

      if (!user) {
        return defaultErrorResponse();
      }

      return NextResponse.json({
        success: true,
        message: "User created successfully",
        user,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "User creation not available",
      });
    }
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
    { status: 500 }
  );
}
