import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? RecursivelyReplaceNullWithUndefined<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
      : T;

export function nullsToUndefined<T>(
  obj: T,
): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null || obj === undefined) {
    return undefined as any;
  }

  if ((obj as any).constructor.name === "Object" || Array.isArray(obj)) {
    for (const key in obj) {
      obj[key] = nullsToUndefined(obj[key]) as any;
    }
  }
  return obj as any;
}

export function emptyToNull<T>(obj: any): T {
  for (const key in obj) {
    if (obj[key] === "") {
      obj[key] = null;
    }
  }
  return obj;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RawUserMetaData = {
  name?: string;
  email?: string;
  full_name?: string;
  picture?: string;
  avatar_url?: string;
  provider_id?: string;
  email_verified?: boolean;
  phone_verified?: boolean;
};

export * from "use-debounce";

export function makeNoun(text: string) {
  console.log("makeNoun", text);
  const lower = text.toLowerCase();
  const vocal = ["a", "e", "i", "o", "u"];

  const firstChar = lower.charAt(0);
  if (vocal.includes(firstChar)) {
    return `an ${text}`;
  } else {
    return `a ${text}`;
  }
}

export function sanitizeGDriveURL(url: string) {
  if (url.includes("drive.google.com/file/d/")) {
    return url.replace("view", "preview");
  }

  return url;
}

export function intMonthToString(month: number) {
  switch (month) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "";
  }
}
