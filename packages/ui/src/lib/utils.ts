import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addImageSize(url: string, width: number, height: number) {
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace("/upload", `/upload/w_${width},h_${height}`);
}

export const dev = process.env.NODE_ENV === "development";
