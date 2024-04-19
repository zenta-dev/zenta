import { cn } from "@/lib/utils";
import Link from "next/link";

export const BrandLink = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("text-2xl", className)}>
      <h1 className="font-bold">
        blog
        <span className="font-normal">.zenta.dev</span>
      </h1>
    </Link>
  );
};
