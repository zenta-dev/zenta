import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
