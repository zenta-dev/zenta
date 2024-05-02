import { cn } from "@packages/ui";
import Link from "next/link";

export const BrandLink = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <Link href="/" className={cn("text-2xl", className)}>
      <h1 className="font-bold">
        {name}
        <span className="font-normal">.zenta.dev</span>
      </h1>
    </Link>
  );
};
