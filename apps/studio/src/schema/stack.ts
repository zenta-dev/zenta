import { z } from "zod";

const StackFounderSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: "Stack founder name is required",
  }),
  type: z.enum(["PERSON", "COMPANY", "ORGANIZATION"]),
  url: z
    .string({
      required_error: "Stack founder URL is required",
    })
    .url({
      message: "Stack founder URL is invalid",
    }),
  photo: z.string().optional(),
});
const StackVersionFormSchema = z.object({
  id: z.string().optional(),
  version: z.any(),
  description: z.string().optional(),
  whatNews: z.string().optional(),
  hash: z.string().optional(),
  url: z.string().url().optional(),
});

export const StackSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    required_error: "Stack name is required",
  }),
  description: z.string({
    required_error: "Stack description is required",
  }),
  logo: z.string({
    required_error: "Stack logo is required",
  }),
  url: z
    .string({
      required_error: "Stack URL is required",
    })
    .url({
      message: "Stack URL is invalid",
    }),
  homepage: z.string().url().optional(),
  founders: z.array(StackFounderSchema),
  versions: z.array(StackVersionFormSchema),
});

export type StackFormValue = z.infer<typeof StackSchema>;
