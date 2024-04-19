import { gss, prisma } from "@/lib/server";
import { normalizeZodError } from "@/lib/utils";
import { StackSchema } from "@/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    for (const version of parse.data.versions) {
      if (!version.hash) {
        version.hash = parse.data.name + version.version;
      }
      if (typeof version.version === "string") {
        version.version = parseFloat(version.version);
      }
    }
    const { name, description, logo, url, versions, homepage, founders } =
      parse.data;

    const find = await prisma.tech.findFirst({
      where: {
        name,
      },
    });

    if (find) {
      return NextResponse.json(
        {
          success: false,
          message: "Tech already exists 🚫",
        },
        {
          status: 400,
        }
      );
    }

    const tech = await prisma.tech.create({
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
              name: founder.name,
              type: founder.type,
              url: founder.url,
              photo: founder.photo,
            },
          })),
        },
        creatorId: ses?.user?.id,
      },
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create tech 🚫",
        },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Tech created successfully ✅",
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
        status: 400,
      }
    );
  }
}
