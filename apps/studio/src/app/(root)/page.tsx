import { env } from "@/env";
import { defaultLayout } from "@/helpers";
import { ResizableHandle, ResizablePanel } from "@packages/ui";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard - " + env.NEXT_PUBLIC_APP_NAME,
    description:
      "Manage and create dashboard for your blog posts with the Zenta blog platform. Engage your audience and expand your online presence with our fast, reliable tools designed for growth and interaction.",
  };
}

export default async function Page(): Promise<JSX.Element> {
  const total = (defaultLayout[1] as number) + (defaultLayout[2] as number);
  return (
    <>
      <ResizableHandle disabled />
      <ResizablePanel defaultSize={total}>
        <h1>woyoo</h1>
      </ResizablePanel>
    </>
  );
}
