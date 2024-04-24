import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";

export const Logo = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="Logo"
        // width={width ?? 32}
        // height={height ?? 32}
        className={cn("rounded-lg", className)}
      />
    </Link>
  );
};
