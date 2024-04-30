import { PostList } from "@/components/server";
import {
  getAllMetaPostsByParams,
  getAllMetaTags,
  getTagById,
  heatCountTag,
} from "@/lib/server";
import { Separator } from "@packages/ui";
import { Metadata } from "next";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};
export const revalidate = 3600 * 6;

export async function generateStaticParams() {
  const tags = await getAllMetaTags();
  return tags.map((tag) => ({
    id: tag.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await getTagById(params.id);
  return {
    title: tag?.name,
    description: tag?.description,
  };
}

export default async function TagPage({ params }: Props) {
  const tag = await getTagById(params.id);

  await heatCountTag(params.id);

  const posts = (
    await getAllMetaPostsByParams({
      tags: {
        some: {
          id: params.id,
        },
      },
    })
  ).map((post) => ({
    id: post.id,
    name: post.title,
    slug: post.slug,
    photo: post.cover,
    description: post.summary,
    updatedAt: post.updatedAt,
  }));

  return (
    <main className="max-w-5xl mx-auto my-2">
      <article>
        <figure className="inline-flex flex-col items-center relative w-full drop-shadow-2xl p-4">
          <Image
            className="rounded-xl object-cover transition-all duration-300 object-center h-48 sm:h-64 md:h-96"
            src={tag?.photo ?? "https://via.placeholder.com/360/144"}
            alt={tag?.name ?? "Tag photo"}
            width={1024}
            height={360}
          />
        </figure>
        <h1 className="my-4 text-2xl font-bold text-center">{tag?.name}</h1>
        <p className="px-4 md:px-8">{tag?.description}</p>
      </article>
      <div className="md:px-8 px-4 py-4">
        <Separator />
        <h1 className="my-2 md:my-4 text-2xl font-bold">Related Posts</h1>
        <PostList posts={posts} className="p-4" />
      </div>
    </main>
  );
}
