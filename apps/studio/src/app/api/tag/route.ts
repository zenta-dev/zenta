import { TagSchema } from "@/app/tags/[id]/_schema";
import { normalizeZodError } from "@/helpers";
import { api } from "@/trpc/server";
import { getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const ses = await getServerSession({ cookies: cookies() });
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

    const { name, description, photo, color } = parse.data;

    const find = await api.tag.getByName({
      name,
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

    const tag = await api.tag.create({
      name,
      description,
      photo,
      color,
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