import { defaultLayout } from "@/lib/config";
import { ResizablePanel, ScrollArea, SupermanLoader } from "@packages/ui";

export default function Loading() {
  return (
    <ResizablePanel defaultSize={defaultLayout[2]}>
      <section>
        <ScrollArea className="h-[calc(83vh)]">
          {/* <div className="flex w-max items-center justify-center">
            <h1 className="text-center text-4xl font-bold">Loading...</h1>
          </div> */}
          <SupermanLoader />
        </ScrollArea>
      </section>
    </ResizablePanel>
  );
}
