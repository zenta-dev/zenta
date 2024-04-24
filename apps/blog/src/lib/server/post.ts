import { db } from "@packages/db";

export const getAllMetaPosts = async () => {
  const posts = await db.post.findMany({
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
  const post = await db.post.findUnique({
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
