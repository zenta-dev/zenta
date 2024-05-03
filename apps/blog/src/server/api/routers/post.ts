import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  getMetaPaginate: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        select: {
          title: true,
          slug: true,
          cover: true,
          summary: true,
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
    return ctx.db.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        cover: true,
        summary: true,
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        authors: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getAllMetaProtect: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      select: {
        id: true,
        title: true,
        cover: true,
        createdAt: true,
      },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.post.findUnique({
        where: {
          slug: input.slug,
        },
        include: {
          authors: true,
          tags: true,
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          tags: {
            select: {
              id: true,
            },
          },
          stack: {
            select: {
              id: true,
            },
          },
        },
      });
    }),

  incrementHeat: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .mutation(({ input, ctx }) => {
      if (!input.id) {
        return null;
      }
      return ctx.db.post.update({
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
