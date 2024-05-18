import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagRouter = createTRPCRouter({
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
