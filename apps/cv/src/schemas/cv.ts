import { Control, UseFormGetValues } from "react-hook-form";
import { z } from "zod";

const PersonalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  email: z.string().min(3),
  phone: z.string().min(3),
  linkedinUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  address: z.string().optional(),
  description: z.string().min(3),
});
export type PersonalSchemaValue = z.infer<typeof PersonalSchema>;
export const PersonalFormSchema = z
  .object({
    cvId: z.string().min(3),
  })
  .merge(PersonalSchema);

export type PersonalFormValue = z.infer<typeof PersonalFormSchema>;

export const EducationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  address: z.string().min(3),
  level: z.string().min(3),
  major: z.string().min(3),
  gpa: z.number(),
  maxGPA: z.number(),
  start: z.date(),
  graduate: z.date().optional(),
  activities: z.array(z.string()),
  active: z.boolean(),
  document: z.string().url().optional(),
});
export const EducationFormSchema = z
  .object({
    cvId: z.string().min(3),
  })
  .merge(
    z.object({
      partial: z.array(EducationSchema).min(1),
    }),
  );
export type EducationFormSchemaValue = z.infer<typeof EducationFormSchema>;

export const ExperienceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  role: z.string().min(3),
  address: z.string().min(3),
  description: z.string().min(3),
  start: z.date(),
  end: z.date().optional(),
  active: z.boolean(),
  achievements: z.array(z.string()),
  document: z.string().url().optional(),
});
export const ExperienceFormSchema = z
  .object({
    cvId: z.string().min(3),
  })
  .merge(
    z.object({
      partial: z.array(ExperienceSchema).min(1),
    }),
  );
export type ExperienceFormSchemaValue = z.infer<typeof ExperienceFormSchema>;

export const OrganizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  role: z.string().min(3),
  address: z.string().min(3),
  description: z.string().min(3),
  start: z.date(),
  end: z.date().optional(),
  active: z.boolean(),
  achievements: z.array(z.string()),
  document: z.string().url().optional(),
});
export const OrganizationFormSchema = z
  .object({
    cvId: z.string().min(3),
  })
  .merge(
    z.object({
      partial: z.array(OrganizationSchema).min(1),
    }),
  );
export type OrganizationFormSchemaValue = z.infer<
  typeof OrganizationFormSchema
>;

export const OtherSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(3),
  name: z.string().min(3),
  description: z.string().min(3),
  month: z.number().optional(),
  year: z.number().optional(),
  achievements: z.array(z.string()),
  document: z.string().url().optional(),
});
export const OtherFormSchema = z
  .object({
    cvId: z.string().min(3),
  })
  .merge(
    z.object({
      partial: z.array(OtherSchema).min(1),
    }),
  );
export type OtherFormSchemaValue = z.infer<typeof OtherFormSchema>;

export const CVSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  image: z.string().url().optional(),
  slug: z.string().min(1),
  personal: PersonalSchema.optional(),
  educations: z.array(EducationSchema),
  experiences: z.array(ExperienceSchema),
  organizations: z.array(OrganizationSchema),
  others: z.array(OtherSchema),
});

export type CVSchemaValue = z.infer<typeof CVSchema>;
export type CVFormControl = Control<CVSchemaValue>;
export type CVGetValues = UseFormGetValues<CVSchemaValue>;
