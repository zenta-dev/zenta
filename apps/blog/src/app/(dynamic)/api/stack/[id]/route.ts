import { gss, prisma } from "@/lib/server";
import { normalizeZodError } from "@/lib/utils";
import { StackSchema } from "@/schema";
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
    const parse = StackSchema.safeParse(body);

    if (!parse.success) {
      const errors = normalizeZodError(parse.error.issues);
      return NextResponse.json({
        success: false,
        errors,
      });
    }
    console.log("BODY", parse.data);

    for (const version of parse.data.versions) {
      if (!version.hash) {
        version.hash = parse.data.name + version.version;
      }
      if (typeof version.version === "string") {
        version.version = parseFloat(version.version);
      }
    }
    const { id } = params;
    const { name, description, logo, url, versions, homepage, founders } =
      parse.data;

    const find = await prisma.tech.findUnique({
      where: {
        id,
      },
      include: {
        founders: true,
        versions: true,
      },
    });

    if (!find) {
      return NextResponse.json(
        {
          success: false,
          message: "Tech not found 🚫",
        },
        {
          status: 400,
        }
      );
    }

    const deleteFoundersIds = find.founders
      .filter(
        (founder) =>
          !founders.some((newFounder) => newFounder.name === founder.name)
      )
      .map((founder) => founder.id);

    const deleteVersionsIds = find.versions
      .filter(
        (version) =>
          !versions.some((newVersion) => newVersion.version === version.version)
      )
      .map((version) => version.id);

    await prisma.techFounder.deleteMany({
      where: {
        id: {
          in: deleteFoundersIds,
        },
      },
    });

    await prisma.techVersion.deleteMany({
      where: {
        id: {
          in: deleteVersionsIds,
        },
      },
    });

    const tech = await prisma.tech.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        logo,
        url,
        homepage,
        versions: {
          connectOrCreate: versions.map((version) => ({
            where: { hash: version.hash },
            create: {
              hash: name + version.version,
              version: version.version,
              whatNews: version.whatNews,
              description: version.description,
              url: version.url,
            },
          })),
        },
        founders: {
          connectOrCreate: founders.map((founder) => ({
            where: { name: founder.name },
            create: {
              creatorId: ses?.user?.id,
              name: founder.name,
              type: founder.type,
              url: founder.url,
              photo: founder.photo,
            },
          })),
        },
        updaterId: ses?.user?.id,
        updatedAt: new Date(),
      },
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tech 🚫",
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tech updated successfully ✅",
        tech,
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

    const tech = await prisma.tech.delete({
      where: {
        id,
      },
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tech 🚫",
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tech deleted successfully ✅",
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
