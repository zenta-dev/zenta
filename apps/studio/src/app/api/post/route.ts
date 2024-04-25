import { calculateReadTime, normalizeZodError } from "@/lib/utils";
import { auth } from "@packages/auth";
import { db } from "@packages/db";
import { PostSchema } from "@packages/validators";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const ses = await auth();
    if (!ses) {
      return NextResponse.json(ses);
    }

    const body = await req.json();
    const parse = PostSchema.safeParse(body);

    if (!parse.success) {
      const errors = normalizeZodError(parse.error.issues);
      return NextResponse.json({
        success: false,
        errors,
      });
    }

    const { title, summary, cover, content, readTime } = parse.data;

    const find = await db.post.findFirst({
      where: {
        title,
      },
    });

    if (find) {
      return NextResponse.json(
        {
          success: false,
          message: "Post already exists 🚫",
        },
        {
          status: 400,
        },
      );
    }

    const totalTime = calculateReadTime(readTime);

    const post = await db.post.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/ /g, "-"),
        summary,
        cover,
        content,
        readTime: totalTime,
        authors: {
          connect: {
            id: ses?.user?.id,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create post 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Post created successfully ✅",
        post,
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
