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
