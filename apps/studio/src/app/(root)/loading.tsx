import { defaultLayout } from "@/lib/config";
import { ResizableHandle, ResizablePanel, SupermanLoader } from "@packages/ui";

export default function Loading() {
  const total = (defaultLayout[1] as number) + (defaultLayout[2] as number);
  return (
    <>
      <ResizableHandle disabled />
      <ResizablePanel defaultSize={total}>
        <SupermanLoader />
      </ResizablePanel>
    </>
  );
}
