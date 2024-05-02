import { StackSchema } from "@/app/stacks/[id]/_schema";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const techRouter = createTRPCRouter({
  create: publicProcedure.input(StackSchema).mutation(({ input, ctx }) => {
    return ctx.db.tech.create({
      data: {
        name: input.name,
        description: input.description,
        logo: input.logo,
        url: input.url,
        homepage: input.homepage,
        versions: {
          create: input.versions.map((version) => ({
            hash: input.name + version.version,
            version: version.version,
            whatNews: version.whatNews,
            description: version.description,
            url: version.url,
          })),
        },
        founders: {
          create: input.founders?.map((founder) => ({
            creatorId: ctx.user?.id,
            name: founder.name,
            type: founder.type,
            url: founder.url,
            photo: founder.photo,
          })),
        },
        creatorId: ctx.user?.id,
      },
    });
  }),

  update: publicProcedure
    .input(z.object({ id: z.string() }).merge(StackSchema))
    .mutation(({ input, ctx }) => {
      return ctx.db.tech.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          logo: input.logo,
          url: input.url,
          homepage: input.homepage,
          versions: {
            connectOrCreate: input.versions.map((version) => ({
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
            connectOrCreate: input.founders?.map((founder) => ({
              where: { id: founder.id },
              create: {
                creatorId: ctx.user?.id,
                name: founder.name,
                type: founder.type,
                url: founder.url,
                photo: founder.photo,
              },
            })),
          },
          updaterId: ctx?.user?.id,
          updatedAt: new Date(),
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.tech.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteManyTechFounder: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.techFounder.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteManyTechVersion: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.techVersion.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.tech.findFirst({
        where: {
          name: input.name,
        },
      });
    }),

  getMetaPaginate: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.tech.findMany({
        select: {
          id: true,
          name: true,
          logo: true,
          description: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: 10 * (input.page - 1),
        take: 10,
      });
    }),

  getAllMetaPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.tech.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
        description: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getAllMetaProtect: publicProcedure.query(({ ctx }) => {
    return ctx.db.tech.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
        description: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.tech.findUnique({
        where: {
          id: input.id,
        },
        include: {
          founders: true,
          versions: true,
        },
      });
    }),

  incrementHeat: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.tech.update({
        where: {
          id: input.id,
        },
        data: {
          heat: {
            increment: 1,
          },
        },
      });
    }),
});
