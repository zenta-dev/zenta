import { PostSchema } from "@/app/posts/[id]/_schema";
import { calculateReadTime, normalizeZodError } from "@/helpers";
import { api } from "@/trpc/server";
import { getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const preferredRegion = ["sin1", "syd1", "hnd1"];

export async function POST(req: Request) {
  try {
    const ses = await getServerSession({ cookies: cookies() });
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

    const { title, summary, cover, content, readTime, tags, techs } =
      parse.data;

    const find = await api.post.getBySlug({
      slug: title.toLowerCase().replace(/ /g, "-"),
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

    const post = await api.post.create({
      title,
      summary,
      cover,
      content,
      readTime: totalTime,
      tags,
      techs,
      authors: [ses.user.id],
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
