import { extensions } from "@/components/client/editor";
import { Separator } from "@/components/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  generateRSS,
  getAllMetaPosts,
  getPostBySlug,
  heatCountPost,
  RSSQuery,
} from "@/lib/server";
import { addImageSize } from "@/lib/utils";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { Metadata } from "next";
import { CldOgImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { PiUserCircleBold } from "react-icons/pi";
import Code from "./Code";
import styles from "./style.module.css";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllMetaPosts();

  const qPost: RSSQuery[] = posts.map((item) => {
    const tags = item.tags ?? [];
    const authors = item.authors.map((author) => {
      console.log(author);
      return {
        name: author.name || "",
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

const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
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
        name: author.name ?? "",
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
  const post = await getPostBySlug(params.slug);
  const content = post?.content as any;
  await heatCountPost(post?.id);

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

  return (
    <>
      <main className="max-w-5xl mx-auto my-2">
        <section>
          <figure className="inline-flex flex-col items-center relative w-full drop-shadow-2xl p-4">
            <Image
              className="rounded-xl object-cover object-center h-48 sm:h-64 md:h-96"
              src={post?.cover ?? "https://via.placeholder.com/360/144"}
              alt={post?.title ?? "Post photo"}
              width={1024}
              height={360}
            />
          </figure>
          <h1
            className={`my-4 text-4xl font-bold text-center ${styles.gradient_text}`}
          >
            {post?.title}
          </h1>
          <div className="grid grid-8">
            {post?.tags.map((item) => {
              return (
                <div key={item.id}>
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
          {post?.authors && (
            <div className="flex items-center justify-center">
              {post.authors.map((user) => (
                <Link key={user.id} href={`mailto:${user.email}`}>
                  <div className="flex items-center justify-center">
                    <Avatar className="h-16 w-16 flex items-center">
                      {user.image ? (
                        <AvatarImage
                          src={addImageSize(user.image, 32, 32)}
                          alt={user.name || user.email || ""}
                        />
                      ) : (
                        <PiUserCircleBold className="text-4xl" />
                      )}
                    </Avatar>
                    <h5 className="font-medium text-lg">{user.name}</h5>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
    return { lang: "javascript", code: "console.log('Hello, world!')" };
  }
  const [, lang, code] = matches;
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
  const publicId = urlToPublicId(src);
  return (
    <figure className="flex items-center justify-center flex-col my-4">
      <CldOgImage src={publicId} alt={alt} />
      <Image
        className="rounded-xl object-cover object-center mb-2"
        src={src}
        alt={alt}
        width={480}
        height={360}
      />
      <figcaption className="text-center text-sm text-neutral-500 font-light w-full italic font-serif">
        {title}
      </figcaption>
    </figure>
  );
}

function urlToPublicId(url: string) {
  const parts = url.split("/");
  const publicId = parts[parts.length - 1].split(".")[0];
  return publicId;
}
