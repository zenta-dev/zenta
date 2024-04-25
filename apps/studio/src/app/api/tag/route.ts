import { normalizeZodError } from "@/lib/utils";
import { auth } from "@packages/auth";
import { db } from "@packages/db";
import { TagSchema } from "@packages/validators";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const ses = await auth();
    if (!ses) {
      return NextResponse.json(ses);
    }

    const body = await req.json();
    const parse = TagSchema.safeParse(body);

    if (!parse.success) {
      const errors = normalizeZodError(parse.error.issues);
      return NextResponse.json({
        success: false,
        errors,
      });
    }

    const { name, description, photo } = parse.data;

    const find = await db.tag.findFirst({
      where: {
        name,
      },
    });

    if (find) {
      return NextResponse.json(
        {
          success: false,
          message: "Tag already exists 🚫",
        },
        {
          status: 400,
        },
      );
    }

    const tag = await db.tag.create({
      data: {
        name,
        description,
        photo,
        creatorId: ses?.user?.id,
      },
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create tag 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tag created successfully ✅",
        tag,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred 🚫",
      },
      {
        status: 400,
      },
    );
  }
}
