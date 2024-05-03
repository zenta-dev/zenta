import fs from "fs";
import { env } from "@/env";
import { Feed } from "feed";

const siteUrl = env.NEXT_PUBLIC_APP_URL || "https://blog.zenta.dev";
const siteName = env.NEXT_PUBLIC_APP_NAME || "Zenta's Blog";

export function generateRSS(data: any[]) {
  const feed = new Feed({
    id: siteUrl,
    title: siteName,
    description: `${siteName} is a website about programming 🧑‍💻 . I will be posting about my programming progress, good and bad days and more. Also, I might have some videos of me coding 🎥 .`,
    link: siteUrl,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
      json: `${siteUrl}/rss.json`,
      atom: `${siteUrl}/atom.xml`,
    },
    image: `${siteUrl}/favicon.ico`,
    author: {
      name: "Rahmat Hidayataullah",
      email: "bokirsianpar95@gmail.com",
      link: "mailto:bokirsianpar95@gmail.com",
    },
    language: "en",
    updated: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteName}`,
  });

  data.forEach((item) => {
    const tags = item.tags ?? [];
    feed.addItem({
      title: item.title,
      description: item.summary,
      link: `${siteUrl}/post/${item.slug}`,
      guid: item.id,
      image: item.cover,
      category: [],
      date: item.updatedAt,
      author: item.authors,
      published: item.createdAt,
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());
  fs.writeFileSync("./public/rss.json", feed.json1());
  // fs.writeFileSync("./public/atom.xml", feed.atom1());
}

export interface RSSQuery {
  title: string;
  description: string;
  link: string;
  guid: string;
  image: string;
  category: string[];
  date: Date;
  author: {
    name: string;
    email: string;
    link: string;
  }[];
  published: Date;
}
