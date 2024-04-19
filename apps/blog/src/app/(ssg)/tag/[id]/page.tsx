import { getAllMetaTags, getTagById, heatCountTag } from "@/lib/server";
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

  await heatCountTag(tag?.id);

  return (
    <main className="max-w-5xl mx-auto my-2">
      <article>
        <figure className="inline-flex flex-col items-center relative w-full drop-shadow-2xl p-4">
          <Image
            className="rounded-xl object-cover object-center h-48 sm:h-64 md:h-96"
            src={tag?.photo ?? "https://via.placeholder.com/360/144"}
            alt={tag?.name ?? "Tag photo"}
            width={1024}
            height={360}
          />
        </figure>
        <h1 className="my-4 text-2xl font-bold text-center">{tag?.name}</h1>
        <p className="px-4 md:px-8">{tag?.description}</p>
      </article>
    </main>
  );
}
