import { gss, prisma } from "@/lib/server";
import { normalizeZodError } from "@/lib/utils";
import { TagSchema } from "@/schema";
import { NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};
export async function PATCH(req: Request, { params }: Props) {
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

    const { id } = params;
    const { name, description, photo } = parse.data;

    const tag = await prisma.tag.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        photo,
        updaterId: ses?.user?.id,
      },
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tag 🚫",
        },
        {
          status: 400,
        }
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
      }
    );
  }
}

export async function DELETE(_: Request, { params }: Props) {
  try {
    console.log(params);
    const ses = await gss(true);
    if (!ses.success) {
      return NextResponse.json(ses);
    }

    const { id } = params;

    const tag = await prisma.tag.delete({
      where: {
        id,
      },
    });

    if (!tag) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tag 🚫",
        },
        {
          status: 400,
        }
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
      }
    );
  }
}
