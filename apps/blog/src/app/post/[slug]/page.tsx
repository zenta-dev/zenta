import { env } from "@/env";
import { db } from "@/server/db";
import { generateRSS } from "@/server/rss";
import { api } from "@/trpc/server";
import { extensions, Separator } from "@packages/ui";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Code from "./Code";
import styles from "./style.module.css";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await db.post.findMany({
    include: {
      tags: true,
      authors: true,
    },
  });

  const qPost = posts.map((item) => {
    const tags = item.tags ?? [];
    const authors = item.authors.map((author) => {
      return {
        email: author.email || "",
        link: `mailto:${author.email}`,
      };
    });
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      description: item.summary || item.title,
      link: `${siteUrl}/post/${item.slug}`,
      guid: item.id,
      image: item.cover || "",
      category: tags.map((tag) => tag.name),
      date: item.updatedAt || new Date(),
      author: authors,
      published: item.createdAt || new Date(),
    };
  });

  generateRSS(qPost);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const siteName = env.NEXT_PUBLIC_APP_NAME;
const siteUrl = env.NEXT_PUBLIC_APP_URL;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.post.getBySlug({ slug: params.slug });
  const authors = post?.authors ?? [];
  const tags = post?.tags ?? [];
  return {
    title: post?.title,
    description: post?.summary,
    applicationName: siteName,
    keywords: [
      "blog",
      "zenta",
      "programming",
      "development",
      ...tags.map((tag) => tag.name),
    ],
    authors: authors.map((author) => {
      return {
        // name: author.name ?? "",
        url: `mailto:${author.email}`,
      };
    }),
    alternates: {
      canonical: `${siteUrl}`,
      types: {
        "application/rss+xml": [{ url: `${siteUrl}/rss.xml`, title: "rss" }],
      },
    },
    icons: `${siteUrl}/favicon.ico`,
    openGraph: {
      title: post?.title,
      description: post?.summary ?? post?.title,
      type: "article",
      url: `https://blog.zenta.dev/post/${params.slug}`,
      siteName,
      images: post?.cover ?? "",
    },
    robots: "index, follow",
    twitter: {
      card: "summary_large_image",
      site: "@zenta",
      creator: "@zenta",
      title: post?.title,
      description: post?.summary ?? post?.title,
      images: post?.cover ?? "",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await api.post.getBySlug({ slug: params.slug });
  const content = post?.content as any;
  await api.post.incrementHeat({ id: post?.id });

  let html = generateHTML(content, extensions);
  const pre = getPre(html);
  const { lang, code } = pre;
  const codeEl = await Code({ lang, code, filename: "code.js" });
  const img = imageReplace(html);
  const newHTML = parse(html);

  if (Array.isArray(newHTML)) {
    newHTML.forEach((el, i) => {
      if (el.type === "pre") {
        newHTML[i] = codeEl;
      }
      if (el.type === "img") {
        newHTML[i] = img;
      }
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <>
      <main className="mx-auto my-2 max-w-5xl">
        <section>
          <figure className="relative inline-flex w-full flex-col items-center p-4 drop-shadow-2xl">
            <Image
              className="h-48 rounded-xl object-cover object-center shadow-lg transition-all duration-300 sm:h-64 md:h-96"
              src={post?.cover ?? "https://via.placeholder.com/360/144"}
              alt={post?.title ?? "Post photo"}
              width={1024}
              height={360}
            />
          </figure>
          <h1
            className={`my-4 text-center text-4xl font-bold ${styles.gradient_text}`}
          >
            {post?.title}
          </h1>
          {post?.authors && (
            <div className="flex items-center justify-center">
              {/* {post.authors.map((user) => (
                <Link key={user.id} href={`mailto:${user.email}`}>
                  <div className="flex items-center justify-center">
                    <p className="mr-2">Written by :</p>
                    <Avatar className="flex items-center">
                      {user.image ? (
                        <AvatarImage
                          className="size-8 rounded-full"
                          src={addImageSize(user.image, 32, 32)}
                          alt={user.name || user.email || ""}
                        />
                      ) : (
                        <PiUserCircleBold className="text-4xl" />
                      )}
                    </Avatar>
                    <h5 className="text-lg font-medium">{user.name}</h5>
                  </div>
                </Link>
              ))} */}
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 items-center justify-center gap-2 p-4 transition-all duration-300 md:grid-cols-4 lg:p-0">
            {post?.tags.map((item) => {
              return (
                <Link
                  href={`/tag/${item.id}`}
                  key={item.id}
                  className="rounded bg-emerald-900 p-2"
                  style={{ backgroundColor: item.color || "#064E3B" }}
                >
                  <p className="text-sm text-white">#{item.name}</p>
                </Link>
              );
            })}
          </div>
        </section>
        <Separator />
        <article className="px-4 md:px-8 ">{newHTML}</article>
      </main>
    </>
  );
}

function getPre(html: string) {
  const regex = /<pre><code class="language-(.*?)">([\s\S]+?)<\/code><\/pre>/;
  const matches = html.match(regex);
  if (!matches) {
    return { lang: "javascript", code: "" };
  }
  const [, lang, code] = matches;
  if (!code) {
    return { lang: "javascript", code: "" };
  }
  const newCode = replace(code);
  return { lang, code: newCode };
}

function replace(code: string) {
  return code
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

function getImg(html: string) {
  const regex = /<img src="(.*?)" alt="(.*?)" title="(.*?)"/;
  const matches = html.match(regex);
  if (!matches) {
    return {
      src: "https://via.placeholder.com/360/144",
      alt: "Post photo",
      title: "Post photo",
    };
  }
  const [, src, alt, title] = matches;
  return { src, alt, title };
}

function imageReplace(html: string) {
  const { src, alt, title } = getImg(html);
  return (
    <figure className="my-4 flex flex-col items-center justify-center">
      <Image
        className="mb-2 rounded-xl object-cover object-center"
        src={src || "https://via.placeholder.com/360/144"}
        alt={alt || "Post photo"}
        width={480}
        height={360}
      />
      <figcaption className="w-full text-center font-serif text-sm font-light italic text-neutral-500">
        {title}
      </figcaption>
    </figure>
  );
}

function urlToPublicId(url: string) {
  const parts = url.split("/");
  const length = parts.length;
  const publicId = parts[length - 1]?.split(".")[0];
  return publicId;
}
