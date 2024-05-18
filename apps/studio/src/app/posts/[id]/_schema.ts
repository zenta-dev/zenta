import { z } from "zod";

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string({
    required_error: "Title is required",
  }),
  cover: z.string().optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  techs: z.array(z.string()).optional(),
  authors: z.array(z.string()).optional(),
  content: z.any(),
  readTime: z.number().optional(),
});

export type PostFormValue = z.infer<typeof PostSchema>;

export interface PostFormProps {
  // initialData: Tech | undefined;
  initialData: any;
  tags: {
    description: string | null;
    id: string;
    updatedAt: Date | null;
    name: string;
    photo: string | null;
  }[];
  techs: {
    description: string;
    id: string;
    updatedAt: Date | null;
    name: string;
    logo: string;
  }[];
}
