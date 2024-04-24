import { Separator } from "@/components/separator";
import { defaultLayout } from "@/lib/config";
import { ResizablePanel, ScrollArea, Skeleton } from "@packages/ui";

export default function Loading() {
  return (
    <ResizablePanel defaultSize={defaultLayout[2]}>
      <section>
        <ScrollArea className="h-[calc(83vh)] ">
          <div className="flex items-center justify-between py-1.5 px-4">
            <div className="flex-col">
              <Skeleton className="w-[360px] h-[32px] mb-1" />
              <Skeleton className="w-[560px] h-[20px]" />
            </div>
            <Skeleton className="w-[36px] h-[36px]" />
          </div>
          <Separator />
          <div className="space-y-8 p-2 w-[calc(40vw)] mx-auto">
            <div className="flex-col mb-16">
              <Skeleton className="w-[48px] h-[16px]" />
              <div className="flex items-center justify-center flex-col">
                <Skeleton className="w-[200px] h-[200px] mb-2" />
                <Skeleton className="w-[180px] h-[34px]" />
              </div>
            </div>
            <div className="flex-col mb-16">
              <Skeleton className="w-[48px] h-[16px] mb-2 " />
              <Skeleton className="w-[836px] h-[34px]" />
            </div>
            <div className="flex-col mb-16">
              <Skeleton className="w-[48px] h-[16px] mb-2 " />
              <Skeleton className="w-[836px] h-[60px]" />
            </div>
            <div>
              <Skeleton className="w-[128px] h-[36px]" />
            </div>
          </div>
        </ScrollArea>
      </section>
    </ResizablePanel>
  );
}
