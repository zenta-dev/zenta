import { defaultLayout } from "@/helpers/config";
import { Button, Heading, ResizablePanel, Separator } from "@packages/ui";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";

export default function StackPage() {
  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <div className="flex h-full w-full flex-col items-center">
          <Heading
            title="Stacks"
            description="Edit and manage stacks for your posts."
            className="m-auto text-center"
          >
            <div className="relative my-4 flex items-center">
              <Separator className="max-w-24" />
              <p className="mx-2 text-muted-foreground">or</p>
              <Separator className="max-w-24" />
            </div>

            <Link href="/stacks/new">
              <Button>
                <TiPlus className="h-4 w-4" />
                <span className="ml-2">New Stack</span>
              </Button>
            </Link>
          </Heading>
        </div>
      </ResizablePanel>
    </>
  );
}
