import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";
import { defaultLayout } from "@/lib/config";
export default function StudioPage() {
  const total = defaultLayout[1] + defaultLayout[2];
  return (
    <>
      <ResizableHandle disabled />
      <ResizablePanel defaultSize={total}></ResizablePanel>
    </>
  );
}
