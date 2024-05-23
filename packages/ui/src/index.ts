import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "@radix-ui/react-icons";
export * from "react-icons/io5";
export * from "react-icons/md";
export * from "./components";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addImageSize(url: string, width: number, height: number) {
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace("/upload", `/upload/w_${width},h_${height}`);
}
