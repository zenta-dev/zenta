import { gss, prisma } from "@/lib/server";
import { normalizeZodError } from "@/lib/utils";
import { TagSchema } from "@/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const ses = await gss(true);
    if (!ses.success) {
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

    const find = await prisma.tag.findFirst({
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
        }
      );
    }

    const tag = await prisma.tag.create({
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
        }
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
      }
    );
  }
}
