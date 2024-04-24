import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@packages/db";
import { env } from "@packages/env";
import { hash } from "bcrypt-ts";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export * from "next-auth";
export { authConfig };

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const useSecureCookies = !!process.env.VERCEL_URL;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  // debug: true,
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  // session: { strategy: "jwt" },
  callbacks: {
    session: async (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";
      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: useSecureCookies ? ".zenta.dev" : ".zenta.local",
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: useSecureCookies ? ".zenta.dev" : ".zenta.local",
        secure: useSecureCookies,
      },
    },
  },
});

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const pwhash = await hash(
    password,
    parseInt(process.env.SALT_ROUNDS || "10"),
  );
  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: pwhash,
    },
  });

  return newUser;
}
