import { ItemMeta } from "@/types";
import { prisma } from ".";

export async function getMetaPosts({ limit = 5, page = 1 }) {
  const res = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      cover: true,
      summary: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: limit * (page - 1),
    take: limit,
  });

  const posts: ItemMeta[] = res.map((post) => {
    return {
      id: post.slug,
      name: post.title,
      photo: post.cover,
      description: post.summary,
      updatedAt: post.updatedAt,
    };
  });

  return posts;
}

export const getAllMetaPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      cover: true,
      summary: true,
      createdAt: true,
      updatedAt: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      authors: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return posts;
};

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      authors: true,
      tags: true,
    },
  });

  return post;
}

export async function getPostById(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return post;
}

export async function heatCountPost(id: string | undefined) {
  if (!id) {
    return;
  }

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      heat: {
        increment: 1,
      },
    },
  });

  return post;
}
