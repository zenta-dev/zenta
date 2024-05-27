import { z } from "zod";

export const PersonalSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedinUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  address: z.string().optional(),
  description: z.string(),
});

export type PersonalSchemaValue = z.infer<typeof PersonalSchema>;

export const EducationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string(),
  level: z.string(),
  major: z.string(),
  gpa: z.number(),
  maxGPA: z.number(),
  start: z.date(),
  graduate: z.date().optional(),
  activities: z.array(z.string()),
  active: z.boolean(),
  document: z.string().url(),
});

export type EducationSchemaValue = z.infer<typeof EducationSchema>;

export const ExperienceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  role: z.string(),
  address: z.string(),
  description: z.string(),
  start: z.date(),
  end: z.date().optional(),
  active: z.boolean(),
  achievements: z.array(z.string()),
  document: z.string().url(),
});

export type ExperienceSchemaValue = z.infer<typeof ExperienceSchema>;

export const OrganizationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  role: z.string(),
  address: z.string(),
  description: z.string(),
  start: z.date(),
  end: z.date().optional(),
  active: z.boolean(),
  achievements: z.array(z.string()),
  document: z.string().url(),
});

export type OrganizationSchemaValue = z.infer<typeof OrganizationSchema>;

export const OtherSchema = z.object({
  id: z.string().optional(),
  category: z.string(),
  name: z.string(),
  description: z.string(),
  month: z.number(),
  year: z.number(),
  achievements: z.array(z.string()),
  document: z.string().url(),
});

export type OtherSchemaValue = z.infer<typeof OtherSchema>;

export const CVSchema = z.object({
  title: z.string(),
  image: z.string().url().optional(),
  personal: PersonalSchema,
  educations: z.array(EducationSchema),
  experiences: z.array(ExperienceSchema),
  organizations: z.array(OrganizationSchema),
  others: z.array(OtherSchema),
});
