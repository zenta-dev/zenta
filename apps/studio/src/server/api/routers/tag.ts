import { TagSchema } from "@/app/(root)/tags/[id]/_schema";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagRouter = createTRPCRouter({
  create: publicProcedure.input(TagSchema).mutation(({ ctx, input }) => {
    return ctx.db.tag.create({
      data: {
        name: input.name,
        description: input.description,
        photo: input.photo,
        color: input.color,
      },
    });
  }),

  update: publicProcedure
    .input(z.object({ id: z.string() }).merge(TagSchema))
    .mutation(({ ctx, input }) => {
      return ctx.db.tag.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          photo: input.photo,
          color: input.color,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.tag.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.tag.findFirst({
        where: {
          name: input.name,
        },
      });
    }),

  getMetaPaginate: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.tag.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          photo: true,
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
    return ctx.db.tag.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        photo: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getAllMetaProtect: publicProcedure.query(({ ctx }) => {
    return ctx.db.tag.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        photo: true,
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
      return ctx.db.tag.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  incrementHeat: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.tag.update({
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
