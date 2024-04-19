import { prisma } from "@/lib/server";
import { MetadataRoute } from "next";

function calculateChangeFrequency(
  date: Date
): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" {
  const diff = Date.now() - date.getTime();
  if (diff < 1000 * 60 * 60 * 24) {
    return "hourly";
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    return "daily";
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    return "weekly";
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    return "monthly";
  } else {
    return "yearly";
  }
}

function determineAllLastChanges(post: any[], tag: any[], stack: any[]) {
  const postLast = post.reduce((prev, curr) => {
    return prev > curr.updatedAt ? prev : curr.updatedAt;
  }, new Date(0));

  const tagLast = tag.reduce((prev, curr) => {
    return prev > curr.createdAt ? prev : curr.createdAt;
  }, new Date(0));

  const stackLast = stack.reduce((prev, curr) => {
    return prev > curr.createdAt ? prev : curr.createdAt;
  }, new Date(0));

  return [postLast, tagLast, stackLast].reduce((prev, curr) => {
    return prev > curr ? prev : curr;
  }, new Date(0));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const post = await prisma.post.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const postSitemap = post.map((post) => {
    return {
      url: `${siteUrl}/post/${post.slug}`,
      lastModified: post.updatedAt as Date,
      changeFrequency: calculateChangeFrequency(post.updatedAt as Date),
      priority: 0.8,
    };
  });

  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      createdAt: true,
    },
  });

  const tagSitemap = tags.map((tag) => {
    return {
      url: `${siteUrl}/tag/${tag.id}`,
      lastModified: tag.createdAt as Date,
      changeFrequency: calculateChangeFrequency(tag.createdAt as Date),
      priority: 0.5,
    };
  });

  const tech = await prisma.tech.findMany({
    select: {
      id: true,
      createdAt: true,
    },
  });

  const techSitemap = tech.map((tech) => {
    return {
      url: `${siteUrl}/stack/${tech.id}`,
      lastModified: tech.createdAt as Date,
      changeFrequency: calculateChangeFrequency(tech.createdAt as Date),
      priority: 0.5,
    };
  });

  const master = determineAllLastChanges(post, tags, tech);

  return [
    {
      url: siteUrl as string,
      lastModified: master,
      changeFrequency: calculateChangeFrequency(master),
      priority: 1,
    },
    ...postSitemap,
    ...tagSitemap,
    ...techSitemap,
  ];
}
