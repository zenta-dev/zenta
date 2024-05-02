import { defaultLayout } from "@/helpers/config";
import { ResizablePanel, ScrollArea, SupermanLoader } from "@packages/ui";

export default function Loading() {
  return (
    <ResizablePanel defaultSize={defaultLayout[2]}>
      <section>
        <ScrollArea className="h-[calc(83vh)]">
          <SupermanLoader />
        </ScrollArea>
      </section>
    </ResizablePanel>
  );
}
