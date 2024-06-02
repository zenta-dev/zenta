import { randomUUID } from "crypto";
import { PostSchema } from "@/app/(root)/posts/[id]/_schema";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure.input(PostSchema).mutation(async ({ input, ctx }) => {
    if (!ctx.user) {
      return null;
    }
    const res = await ctx.db.post.create({
      data: {
        title: input.title,
        slug: input.title.toLowerCase().replace(/ /g, "-"),
        summary: input.summary,
        cover: input.cover,
        content: input.content,
        readTime: input.readTime,

        tags: {
          connect: input.tags?.map((tag) => ({ id: tag })),
        },
        stack: {
          connect: input.techs?.map((tech) => ({ id: tech })),
        },
      },
    });

    await ctx.db.postAuthor.create({
      data: {
        userId: ctx.user.id,
        postId: res.id,
      },
    });

    return res;
  }),

  update: publicProcedure
    .input(z.object({ id: z.string() }).merge(PostSchema))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        return null;
      }

      const res = await ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          slug: input.title.toLowerCase().replace(/ /g, "-"),
          summary: input.summary,
          cover: input.cover,
          content: input.content,
          readTime: input.readTime,

          tags: {
            connect: input.tags?.map((tag) => ({ id: tag })),
          },
          stack: {
            connect: input.techs?.map((tech) => ({ id: tech })),
          },
        },
      });

      // delete old authors
      await ctx.db.postAuthor.deleteMany({
        where: {
          postId: input.id,
        },
      });

      // add new authors
      await ctx.db.postAuthor.create({
        data: {
          userId: ctx.user.id,
          postId: input.id || randomUUID(),
        },
      });

      return res;
    }),

  unlinkTags: publicProcedure
    .input(z.object({ id: z.string(), tags: z.array(z.string()) }))
    .mutation(({ input, ctx }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          tags: {
            disconnect: input.tags.map((tag) => ({ id: tag })),
          },
        },
      });
    }),

  unlinkTechs: publicProcedure
    .input(z.object({ id: z.string(), techs: z.array(z.string()) }))
    .mutation(({ input, ctx }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          stack: {
            disconnect: input.techs.map((tech) => ({ id: tech })),
          },
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),

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
            user: true,
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
