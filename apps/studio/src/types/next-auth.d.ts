import { User as dbUser } from "@db/client";
import "next-auth";
import "next-auth/adapters";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  }
  interface Session {
    user:
      | {
          id: string;
          name: string | null;
          email: string | null;
          image: string | null;
        }
      | dbUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  }
}

// adapter interface next auth
declare module "next-auth/adapters" {
  interface AdapterUser {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password: string | null;
  }
}
