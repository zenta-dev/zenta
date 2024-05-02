import { PostSchema } from "@/app/posts/[id]/_schema";
import { calculateReadTime, normalizeZodError } from "@/helpers";
import { api } from "@/trpc/server";
import { getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};
export async function PATCH(req: Request, { params }: Props) {
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

    const { id } = params;
    const { title, summary, cover, content, readTime, tags, techs } =
      parse.data;

    const totalTime = calculateReadTime(readTime);

    // unconnect all tags and techs from post
    const postTags = await api.post.getById({
      id,
    });
    if (tags) {
      await api.post.unlinkTags({
        id,
      });
    }
    if (techs) {
      await api.post.unlinkTechs({
        id,
      });
    }

    const post = await api.post.update({
      id,
      title,
      summary,
      cover,
      content,
      readTime: totalTime,
      authors: [ses.user.id],
      tags,
      techs,
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update post 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Post updated successfully ✅",
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
        status: 500,
      },
    );
  }
}

export async function DELETE(_: Request, { params }: Props) {
  try {
    const ses = await getServerSession({ cookies: cookies() });
    if (!ses) {
      return NextResponse.json(ses);
    }

    const { id } = params;

    const post = await api.post.delete({
      id,
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete post 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Post deleted successfully ✅",
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
        status: 500,
      },
    );
  }
}
