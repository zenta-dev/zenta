import { z } from "zod";

export const TagSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: "Name is required",
  }),
  color: z.string().optional(),
  description: z.string().optional(),
  photo: z.string().optional(),
});

export type TagFormValue = z.infer<typeof TagSchema>;

interface RemapTag {
  id: string;
  name: string;
  description?: string;
  photo?: string;
}

export interface TagFormProps {
  initialData: RemapTag | undefined;
}
