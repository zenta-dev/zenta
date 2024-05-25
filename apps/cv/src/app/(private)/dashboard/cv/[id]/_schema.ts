import { z } from "zod";

export const PersonalSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedinUrl: z.string().url().optional().nullable(),
  portfolioUrl: z.string().url().optional().nullable(),
  address: z.string().optional().nullable(),
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
  graduate: z.date().nullable(),
  activities: z.array(z.string()),
  active: z.boolean(),
  document: z.string().url().nullable(),
});

export type EducationSchemaValue = z.infer<typeof EducationSchema>;

export const ExperienceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  role: z.string(),
  address: z.string(),
  description: z.string(),
  start: z.date(),
  end: z.date().nullable(),
  active: z.boolean(),
  achievements: z.array(z.string()),
  document: z.string().url().nullable(),
});

export type ExperienceSchemaValue = z.infer<typeof ExperienceSchema>;

export const OrganizationSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  role: z.string(),
  address: z.string(),
  description: z.string(),
  start: z.date(),
  end: z.date().nullable(),
  active: z.boolean(),
  achievements: z.array(z.string()),
  document: z.string().url().nullable(),
});

export type OrganizationSchemaValue = z.infer<typeof OrganizationSchema>;

export const OtherSchema = z.object({
  id: z.string().optional(),
  category: z.string(),
  name: z.string(),
  description: z.string(),
  month: z.date().nullable(),
  year: z.date().nullable(),
  achievements: z.array(z.string()),
  document: z.string().url().nullable(),
});

export type OtherSchemaValue = z.infer<typeof OtherSchema>;
