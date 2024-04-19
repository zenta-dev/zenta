import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultLayout } from "@/lib/config";
import { getTechById } from "@/lib/server";
import { nullsToUndefined } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { StackForm } from "./StackForm";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stack = await getTechById(params.id);
  return {
    title: stack?.name,
    description: stack?.description,
  };
}

export default async function StackPageId({ params }: Props) {
  const { id } = params;
  if (!id) {
    redirect("/studio/stacks");
  }
  const stack = await getTechById(id);

  if (!stack && id !== "new") {
    redirect("/studio/stacks");
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
