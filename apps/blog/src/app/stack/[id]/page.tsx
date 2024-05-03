import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const techs = await db.tech.findMany({
    select: {
      id: true,
    },
  });

  return techs.map((tech) => ({
    id: tech.id,
  }));

  // const techs = await api.tech.getAllMetaPublic();
  // return techs.map((tech) => ({
  //   id: tech.id,
  // }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tech = await api.tech.getById({ id: params.id });
  return {
    title: tech?.name,
    description: tech?.description,
  };
}

export default async function TechPage({ params }: Props) {
  const tech = await api.tech.getById({ id: params.id });

  await api.tech.incrementHeat({ id: params.id });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <main className="mx-auto my-2 max-w-5xl">
      <article>
        <figure className="relative inline-flex w-full flex-col items-center p-4 drop-shadow-2xl">
          <Image
            className="h-48 rounded-xl object-cover object-center transition-all duration-300 sm:h-64 md:h-96"
            src={tech?.logo ?? "https://via.placeholder.com/360/144"}
            alt={tech?.name ?? "Tag logo"}
            width={1024}
            height={360}
          />
        </figure>
        <h1 className="my-4 text-center text-2xl font-bold">{tech?.name}</h1>
        <p className="px-4 md:px-8">{tech?.description}</p>
      </article>
    </main>
  );
}
