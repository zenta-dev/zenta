import { db } from "@packages/db";
import { env } from "@packages/env";
import { LoginSchema } from "@packages/validators";
import { compareSync } from "bcrypt-ts";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";

export default {
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
} satisfies NextAuthConfig;
