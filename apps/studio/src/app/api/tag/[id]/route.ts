import { TagSchema } from "@/app/tags/[id]/_schema";
import { normalizeZodError } from "@/helpers";
import { api } from "@/trpc/server";
import { getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const preferredRegion = ["sin1", "syd1", "hnd1"];

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
    const parse = TagSchema.safeParse(body);

    if (!parse.success) {
      const errors = normalizeZodError(parse.error.issues);
      return NextResponse.json({
        success: false,
        errors,
      });
    }

    const { id } = params;
    const { name, description, photo, color } = parse.data;

    const tag = await api.tag.update({
      id,
      name,
      description,
      photo,
      color,
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tag 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tag updated successfully ✅",
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

    const tag = await api.tag.delete({
      id,
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tag 🚫",
        },
        {
          status: 400,
        },
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tag deleted successfully ✅",
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
