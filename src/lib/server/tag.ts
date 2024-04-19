import { ItemMeta } from "@/types";
import { prisma } from ".";

export async function getMetaTags({ limit = 5, page = 1 }) {
  const tags: ItemMeta[] = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      photo: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: limit * (page - 1),
    take: limit,
  });

  return tags;
}

export const getAllMetaTags = async () => {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      photo: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return tags;
};

export async function getTagById(id: string) {
  const tag = await prisma.tag.findUnique({
    where: {
      id,
    },
  });

  return tag;
}

export async function heatCountTag(id: string | undefined) {
  if (!id) {
    return;
  }

  const tag = await prisma.tag.update({
    where: {
      id,
    },
    data: {
      heat: {
        increment: 1,
      },
    },
  });

  return tag;
}
