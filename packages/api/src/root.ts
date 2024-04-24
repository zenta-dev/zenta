import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { tagRouter } from "./router/tag";
import { techRouter } from "./router/tech";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  tag: tagRouter,
  tech: techRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
