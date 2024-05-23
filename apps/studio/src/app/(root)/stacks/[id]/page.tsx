// import { getTechById } from "@/lib/server";
import { env } from "@/env";
import { defaultLayout } from "@/helpers/config";
import { nullsToUndefined } from "@/helpers/utils";
import { api } from "@/trpc/server";
import { ResizablePanel, ScrollArea } from "@packages/ui";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { StackForm } from "./StackForm";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stack = await api.tech.getById({ id: params.id });

  return {
    title: `${stack?.name} - ${env.NEXT_PUBLIC_APP_NAME}`,
    description: stack?.description,
  };
}

export default async function StackPageId({ params }: Props) {
  const { id } = params;
  if (!id) {
    redirect("/stacks");
  }
  const stack = await api.tech.getById({ id });

  if (!stack && id !== "new") {
    redirect("/stacks");
  }

  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <section>
          <ScrollArea className="h-[calc(83vh)] ">
            <StackForm initialData={nullsToUndefined(stack)} />
          </ScrollArea>
        </section>
      </ResizablePanel>
    </>
  );
}
