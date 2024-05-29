import { randomUUID } from "crypto";
import {
  EducationFormSchema,
  ExperienceFormSchema,
  OrganizationFormSchema,
  OtherFormSchema,
  PersonalFormSchema,
} from "@/schemas/cv";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const cvRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    return db.cv.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        id: true,
        title: true,
        image: true,
        updatedAt: true,
      },
    });
  }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx: { db, user } }) => {
      return db.cv.findFirst({
        where: {
          id: input.id,
          userId: user?.id,
        },
        include: {
          personal: true,
          educations: true,
          experiences: true,
          organizations: true,
          others: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async ({ input, ctx: { db, user } }) => {
      const count = await db.cv.count({
        where: {
          userId: user?.id,
        },
      });

      if (count >= 2) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only have 2 CVs",
        });
      }

      let slug = input.title.toLowerCase().replace(/\s+/g, "-"); 

      const exists = await db.cv.findMany({
        where: {
          slug,
        },
      });

      if (exists.length > 0) { 
        const length = exists.length + 1;
        slug = `${slug}-${length}`;
      }

      return db.cv.create({
        data: {
          title: input.title,
          slug,
          userId: user?.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx: { db, user } }) => {
      return db.cv.delete({
        where: {
          id: input.id,
          userId: user?.id,
        },
      });
    }),

  updatePersonal: protectedProcedure
    .input(PersonalFormSchema)
    .mutation(({ input, ctx: { db, user } }) => {
      const { cvId, ...personal } = input;
      return db.cv.update({
        where: {
          id: cvId,
          userId: user?.id,
        },
        data: {
          personal: {
            upsert: {
              create: personal,
              update: personal,
            },
          },
        },
        select: {
          personal: true,
        },
      });
    }),

  updateEducations: protectedProcedure
    .input(EducationFormSchema)
    .mutation(async ({ input, ctx: { db, user } }) => {
      const { cvId, ...educations } = input;

      await db.education.deleteMany({
        where: {
          cvId,
          NOT: {
            id: {
              in: educations.partial.map(
                (education) => education.id || randomUUID(),
              ),
            },
          },
        },
      });

      return db.cv.update({
        where: {
          id: cvId,
          userId: user?.id,
        },
        data: {
          educations: {
            upsert: educations.partial.map((education) => ({
              where: {
                id: education.id || randomUUID(),
              },
              create: education,
              update: education,
            })),
          },
        },
        include: {
          educations: true,
        },
      });
    }),

  updateExperience: protectedProcedure
    .input(ExperienceFormSchema)
    .mutation(async ({ input, ctx: { db, user } }) => {
      const { cvId, ...experiences } = input;

      await db.experience.deleteMany({
        where: {
          cvId,
          NOT: {
            id: {
              in: experiences.partial.map(
                (experience) => experience.id || randomUUID(),
              ),
            },
          },
        },
      });

      return db.cv.update({
        where: {
          id: cvId,
          userId: user?.id,
        },
        data: {
          experiences: {
            upsert: experiences.partial.map((experience) => ({
              where: {
                id: experience.id || randomUUID(),
              },
              create: experience,
              update: experience,
            })),
          },
        },
        include: {
          experiences: true,
        },
      });
    }),

  updateOrganization: protectedProcedure
    .input(OrganizationFormSchema)
    .mutation(async ({ input, ctx: { db, user } }) => {
      const { cvId, ...organizations } = input;

      await db.organization.deleteMany({
        where: {
          cvId,
          NOT: {
            id: {
              in: organizations.partial.map(
                (organization) => organization.id || randomUUID(),
              ),
            },
          },
        },
      });

      return db.cv.update({
        where: {
          id: cvId,
          userId: user?.id,
        },
        data: {
          organizations: {
            upsert: organizations.partial.map((organization) => ({
              where: {
                id: organization.id || randomUUID(),
              },
              create: organization,
              update: organization,
            })),
          },
        },
        include: {
          organizations: true,
        },
      });
    }),

  updateOther: protectedProcedure
    .input(OtherFormSchema)
    .mutation(async ({ input, ctx: { db, user } }) => {
      const { cvId, ...others } = input;

      await db.other.deleteMany({
        where: {
          cvId,
          NOT: {
            id: {
              in: others.partial.map((other) => other.id || randomUUID()),
            },
          },
        },
      });

      return db.cv.update({
        where: {
          id: cvId,
          userId: user?.id,
        },
        data: {
          others: {
            upsert: others.partial.map((other) => ({
              where: {
                id: other.id || randomUUID(),
              },
              create: other,
              update: other,
            })),
          },
        },
        include: {
          others: true,
        },
      });
    }),
});
