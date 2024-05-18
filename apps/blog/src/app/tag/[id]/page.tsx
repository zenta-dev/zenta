import { PostList } from "@/components";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { Separator } from "@packages/ui";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const tags = await db.tag.findMany({
    select: {
      id: true,
    },
  });
  return tags.map((tag) => ({
    id: tag.id,
  })); 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await api.tag.getById({ id: params.id });
  return {
    title: tag?.name,
    description: tag?.description,
  };
}

export default async function TagPage({ params }: Props) {
  const tag = await api.tag.getById({ id: params.id });
  await api.tag.incrementHeat({ id: params.id });

  const posts = (await api.post.getAllMetaPublic()).map((post) => ({
    id: post.id,
    name: post.title,
    slug: post.slug,
    photo: post.cover,
    description: post.summary,
    updatedAt: post.updatedAt,
  }));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <main className="mx-auto my-2 max-w-5xl">
      <article>
        <figure className="relative inline-flex w-full flex-col items-center p-4 drop-shadow-2xl">
          <Image
            className="h-48 rounded-xl object-cover object-center transition-all duration-300 sm:h-64 md:h-96"
            src={tag?.photo ?? "https://via.placeholder.com/360/144"}
            alt={tag?.name ?? "Tag photo"}
            width={1024}
            height={360}
          />
        </figure>
        <h1 className="my-4 text-center text-2xl font-bold">{tag?.name}</h1>
        <p className="px-4 md:px-8">{tag?.description}</p>
      </article>
      <div className="px-4 py-4 md:px-8">
        <Separator />
        <h1 className="my-2 text-2xl font-bold md:my-4">Related Posts</h1>
        <PostList posts={posts} className="p-4" />
      </div>
    </main>
  );
}
