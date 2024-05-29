import { TRPCReactProvider } from "@/trpc/react";
import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
