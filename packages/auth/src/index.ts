import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@packages/db";
import { env } from "@packages/env";
import { LoginSchema } from "@packages/validators";
import { compareSync, hash } from "bcrypt-ts";
import type { DefaultSession } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";

export * from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const useSecureCookies = process.env.NODE_ENV === "production";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  trustHost: true,
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
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");
        console.log(credentials);
        const { email, password } = LoginSchema.parse(credentials);
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
          throw new CredentialsSignin({
            cause: { message: "Invalid credentials" },
          });
        }

        if (compareSync(password, user.password || "")) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } else {
          throw new CredentialsSignin({
            cause: { message: "Invalid credentials" },
          });
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
    authorized({ request, auth }) {
      return true;
    },
  },

  pages: {
    signIn: "/signin",
  },
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? "none" : "lax",
        path: "/",
        domain: useSecureCookies ? ".zenta.dev" : ".zenta.local",
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      name: `${useSecureCookies ? "__Host-" : ""}authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? "none" : "lax",
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
