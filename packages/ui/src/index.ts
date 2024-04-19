import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/form";
export * from "./components/ui/input";
export * from "./components/ui/label";
export * from "./components/ui/separator";
export * from "./components/ui/sonner";
export * from "./components/ui/theme";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
