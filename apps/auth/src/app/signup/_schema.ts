import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .optional(),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
