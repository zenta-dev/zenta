import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./components/ui/index";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
