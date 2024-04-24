import { db } from "@packages/db";

export function getAllMetaTags() {
  return db.tag.findMany({
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
}

export function getTagById(id: string) {
  return db.tag.findUnique({
    where: {
      id,
    },
  });
}

export async function getMetaTags({ limit = 5, page = 1 }) {
  const tags = await db.tag.findMany({
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

export async function heatCountTag(id: string | undefined) {
  if (!id) {
    return;
  }

  const tag = await db.tag.update({
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
