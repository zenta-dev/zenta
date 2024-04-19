import { JsonValue } from "@prisma/client/runtime/library";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodIssue } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateHTML(json: JsonValue | undefined) {
  if (!json) {
    return "";
  }

  let html = "";
  const data = json as any;
  console.clear();
  for (const node of data.content) {
    const item = determineHTML(node);
    html += item;
  }
  console.log(html);
  return html;
}

function determineHTML(node: any) {
  if (node.content === undefined) {
    return "";
  }
  switch (node.type) {
    case "heading":
      if (node.content !== undefined) {
        switch (node.attrs.level) {
          case 1:
            return `<h1 className="my-2 text-3xl font-bold">${node.content[0].text}</h1>`;
          case 2:
            return `<h2 className="my-2 text-2xl font-bold">${node.content[0].text}</h2>`;
          case 3:
            return `<h3 className="my-2 text-xl font-bold">${node.content[0].text}</h3>`;
        }
      }
    case "paragraph":
      if (node.content !== undefined) {
        return `<p>${node.content[0].text}</p>`;
      }
    case "taskList":
      if (node.content !== undefined) {
        return `<ul className="list-disc list-inside">${node.content
          .map(
            (item: any) =>
              `<li className="${item.checked ? "line-through" : ""}">${
                item.content[0].content[0].text
              }</li>`
          )
          .join("")}</ul>`;
      }
    case "codeBlock":
      if (node.content !== undefined) {
        return `<pre className="rounded bg-neutral-800">
          <code>${node.content[0].text}</code>
        </pre>`;
      }
    case "blockquote":
      if (node.content !== undefined) {
        return `<blockquote className="pl-4 border-l-4 border-neutral-500">${node.content
          .map(
            (item: any) =>
              '<p className="italic">' + item.content[0].text + "</p>"
          )
          .join("")}</blockquote>`;
      }
  }
}

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
  ? RecursivelyReplaceNullWithUndefined<U>[]
  : T extends Record<string, unknown>
  ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
  : T;

export function nullsToUndefined<T>(
  obj: T
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

export function addImageSize(url: string, width: number, height: number) {
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace("/upload", `/upload/w_${width},h_${height}`);
}

export function emptyToNull<T>(obj: any): T {
  for (const key in obj) {
    if (obj[key] === "") {
      obj[key] = null;
    }
  }
  return obj;
}

interface ZodErrorProps {
  label: string;
  message: string;
}

export function normalizeZodError(issues: ZodIssue[]) {
  let msgs: ZodErrorProps[] = [];

  for (const iss of issues) {
    const path = iss.path[0];
    const msg = iss.message;
    if (typeof path === "string") {
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      const message = msg.charAt(0).toLowerCase() + msg.slice(1);
      msgs.push({
        label: label + " Error ⚠️",
        message: label + " " + message,
      });
    }
  }

  return msgs;
}

export function debounce(func: Function, timeout: number) {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export function calculateReadTime(words: number | undefined) {
  if (!words) {
    return 0;
  }

  const wordsPerMinute = 200;

  const minutes = words / wordsPerMinute;

  return Math.ceil(minutes);
}

