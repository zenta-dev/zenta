import { StackSchema } from "@/app/stacks/[id]/_schema";
import { normalizeZodError } from "@/helpers";
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
    const { id } = params;
    const { name, description, logo, url, versions, homepage, founders } =
      parse.data;

    const find = await api.tech.getById({
      id,
    });

    if (!find) {
      return NextResponse.json(
        {
          success: false,
          message: "Tech not found 🚫",
        },
        {
          status: 400,
        },
      );
    }

    const deleteFoundersIds = find.founders
      .filter(
        (founder) =>
          !founders.some((newFounder) => newFounder.name === founder.name),
      )
      .map((founder) => founder.id);

    const deleteVersionsIds = find.versions
      .filter(
        (version) =>
          !versions.some(
            (newVersion) => newVersion.version === version.version,
          ),
      )
      .map((version) => version.id);

    if (deleteFoundersIds.length) {
      await api.tech.deleteManyTechFounder({
        ids: deleteFoundersIds,
      });
    }

    if (deleteVersionsIds.length) {
      await api.tech.deleteManyTechVersion({
        ids: deleteVersionsIds,
      });
    }

    const tech = await api.tech.update({
      id,
      name,
      description,
      logo,
      url,
      homepage,
      versions: versions,
      founders: founders,
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tech 🚫",
        },
        {
          status: 400,
        },
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

    const tech = await api.tech.delete({
      id,
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tech 🚫",
        },
        {
          status: 400,
        },
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
      },
    );
  }
}
