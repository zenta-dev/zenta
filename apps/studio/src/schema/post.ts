import { z } from "zod";

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string({
    required_error: "Title is required",
  }),
  cover: z.string().optional(),
  summary: z.string().optional(),
  content: z.any(),
  readTime: z.number().optional(),
});

export type PostFormValue = z.infer<typeof PostSchema>;
