import { defaultLayout } from "@/lib/config";
import { nullsToUndefined } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ResizablePanel, ScrollArea } from "@packages/ui";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PostForm } from "./PostForm";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await api.post.getById({ id: params.id });
  return {
    title: post?.title || "New Post",
    description: post?.summary || "Create a new post",
  };
}

export default async function PostPageId({ params }: Props) {
  const { id } = params;
  if (!id) {
    redirect("/tags");
  }

  const post = await api.post.getById({ id });

  if (!post && id !== "new") {
    redirect("/tags");
  }

  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <section>
          <ScrollArea className="h-[calc(83vh)]">
            <PostForm initialData={nullsToUndefined(post)} />
          </ScrollArea>
        </section>
      </ResizablePanel>
    </>
  );
}
