import { getAllMetaTechs, getTechById, heatCountTech } from "@/lib/server";
import { Metadata } from "next";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};
export const revalidate = 3600 * 6;

export async function generateStaticParams() {
  const techs = await getAllMetaTechs();
  return techs.map((tech) => ({
    id: tech.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tech = await getTechById(params.id);
  return {
    title: tech?.name,
    description: tech?.description,
  };
}

export default async function TechPage({ params }: Props) {
  const tech = await getTechById(params.id);

  await heatCountTech(tech?.id);

  return (
    <main className="max-w-5xl mx-auto my-2">
      <article>
        <figure className="inline-flex flex-col items-center relative w-full drop-shadow-2xl p-4">
          <Image
            className="rounded-xl object-cover object-center h-48 sm:h-64 md:h-96"
            src={tech?.logo ?? "https://via.placeholder.com/360/144"}
            alt={tech?.name ?? "Tag logo"}
            width={1024}
            height={360}
          />
        </figure>
        <h1 className="my-4 text-2xl font-bold text-center">{tech?.name}</h1>
        <p className="px-4 md:px-8">{tech?.description}</p>
      </article>
    </main>
  );
}
