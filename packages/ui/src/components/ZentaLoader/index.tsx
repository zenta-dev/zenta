import { cn } from "@packages/utils";
import Image from "next/image";
import loading from "./loading.svg";

export const ZentaLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center",
        className,
      )}
    >
      <Image src={loading} alt="Loading" width={244} height={244} />
      <p className="font-serif text-3xl  ">Loading...</p>
    </div>
  );
};
