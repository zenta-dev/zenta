import { cn } from "@packages/ui";
import Image from "next/image";
import Link from "next/link";
import logo from "./logo.svg";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" className={cn("rounded-lg", className)} />
    </Link>
  );
};
