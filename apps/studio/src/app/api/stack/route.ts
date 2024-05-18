import { StackSchema } from "@/app/stacks/[id]/_schema";
import { normalizeZodError } from "@/helpers";
import { api } from "@/trpc/server";
import { getServerSession } from "@packages/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const preferredRegion = ["sin1", "syd1", "hnd1"];

export async function POST(req: Request) {
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
    const { name, description, logo, url, versions, homepage, founders } =
      parse.data;

    const find = await api.tech.getByName({
      name,
    });

    if (find) {
      return NextResponse.json(
        {
          success: false,
          message: "Tech already exists 🚫",
        },
        {
          status: 400,
        },
      );
    }

    const tech = await api.tech.create({
      name,
      description,
      logo,
      url,
      homepage,
      versions,
      founders,
    });

    if (!tech) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create tech 🚫",
        },
        {
          status: 400,
        },
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
      },
    );
  }
}
