import { defaultLayout } from "@/lib/config";
import { ResizableHandle, ResizablePanel } from "@packages/ui";
export default function StudioPage() {
  const total = defaultLayout[1] + defaultLayout[2];
  return (
    <>
      <ResizableHandle disabled />
      <ResizablePanel defaultSize={total}></ResizablePanel>
    </>
  );
}
