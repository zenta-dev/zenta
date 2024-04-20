import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@packages/db";
import { compareSync } from "bcrypt-ts";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import { env } from "../env";

export type { Session } from "next-auth";

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
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error("No credentials provided");

        const { email, password } = credentials as any;
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const user = await db.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        if (compareSync(password, user.password || "")) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
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
        domain: ".zenta.dev",
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      name: "__Host-authjs.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: ".zenta.dev",
        secure: useSecureCookies,
      },
    },
  },
});
