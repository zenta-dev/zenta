export * from "./post";
export * from "./stack";
export * from "./tag";

export interface ItemMeta {
  id: string;
  name: string;
  photo: string | null;
  description: string | null;
  updatedAt: Date | null;
}
