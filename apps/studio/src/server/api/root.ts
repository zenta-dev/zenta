import { postRouter } from "@/server/api/routers/post";
import { tagRouter } from "@/server/api/routers/tag";
import { techRouter } from "@/server/api/routers/tech";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

 
export const appRouter = createTRPCRouter({
  post: postRouter,
  tag: tagRouter,
  tech: techRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);