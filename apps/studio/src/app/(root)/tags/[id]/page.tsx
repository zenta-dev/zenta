import { env } from "@/env";
import { defaultLayout } from "@/helpers/config";
import { nullsToUndefined } from "@/helpers/utils";
import { api } from "@/trpc/server";
import { ResizablePanel, ScrollArea } from "@packages/ui";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { TagForm } from "./TagForm";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await api.tag.getById({ id: params.id });

  return {
    title: `${tag?.name} - ${env.NEXT_PUBLIC_APP_NAME}`,
    description: tag?.description,
  };
}

export default async function TagPageId({ params }: Props) {
  const { id } = params;
  if (!id) {
    redirect("/tags");
  }
  const tag = await api.tag.getById({ id });

  if (!tag && id !== "new") {
    redirect("/tags");
  }

  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <section>
          <ScrollArea className="h-[calc(83vh)] ">
            <TagForm initialData={nullsToUndefined(tag)} />
          </ScrollArea>
        </section>
      </ResizablePanel>
    </>
  );
}
