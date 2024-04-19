import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export const AuthAdapter = PrismaAdapter(prisma);

export const options = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
    // 1 minute
    maxAge: 60 * 60,
    // 1 hour
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60,
  },
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error("No credentials provided");

        const { email, password } = credentials;
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        if (bcrypt.compareSync(password, user.password)) {
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
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.image,
        };
      }
      return session;
    },
  },
} satisfies AuthOptions;

export async function gss(isJson = false) {
  const session = await getServerSession(options);
  if (!session) {
    if (isJson) {
      return {
        success: false,
        message: "Unauthorized",
        redirect: true,
      };
    } else {
      return redirect("/auth/signin");
    }
  } else {
    if (isJson) {
      return {
        success: true,
        message: "Authorized",
        user: session.user || null,
      };
    } else {
      return {
        user: session.user,
      };
    }
  }
}
