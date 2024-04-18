import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@packages/db";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { env } from "../env";

// const useSecureCookies = env.NEXTAUTH_URL.startsWith("https://");
// const cookiePrefix = useSecureCookies ? "__Secure-" : "";
// const hostName = new URL(env.NEXTAUTH_URL).hostname;
// const rootDomain = "nexonauts.com";
export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

console.log(env.DISCORD_CLIENT_ID);

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
  ],
  callbacks: {
    session: (opts) => {
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
  // cookies: {
  //   // set cookie options on top level domain
  //   sessionToken: {
  //     name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: useSecureCookies,
  //       domain: hostName == "localhost" ? hostName : "." + rootDomain, // add a . in front so that subdomains are included
  //     },
  //   },
  // },
});

// export const authOptions: NextAuthOptions = {
//   secret: env.NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(db) as Adapter,
//   // session: {
//   //   strategy: "jwt",
//   //   // 1 minute
//   //   maxAge: 60 * 60,
//   //   // 1 hour
//   //   updateAge: 24 * 60 * 60,
//   // },
//   // jwt: {
//   //   secret: env.NEXTAUTH_JWT_SECRET,
//   //   maxAge: 60 * 60,
//   // },
//   providers: [
//     DiscordProvider({
//       clientId: env.DISCORD_CLIENT_ID,
//       clientSecret: env.DISCORD_CLIENT_SECRET,
//     }),
//     // CredentialProvider({
//     //   name: "credentials",
//     //   credentials: {
//     //     email: { label: "Email", type: "email" },
//     //     password: { label: "Password", type: "password" },
//     //   },
//     //   authorize: async (credentials) => {
//     //     if (!credentials) throw new Error("No credentials provided");

//     //     const { email, password } = credentials;
//     //     if (!email) throw new Error("Email is required");
//     //     if (!password) throw new Error("Password is required");

//     //     const user = await db.user.findUnique({ where: { email } });
//     //     if (!user) throw new Error("Invalid credentials");

//     //     if (compareSync(password, user.password || "")) {
//     //       return {
//     //         id: user.id,
//     //         firstName: user.firstName,
//     //         lastName: user.lastName,
//     //         email: user.email,
//     //         image: user.image,
//     //       };
//     //     } else {
//     //       throw new Error("Invalid credentials");
//     //     }
//     //   },
//     // }),
//   ],
//   pages: {
//     signIn: "/signin",
//     verifyRequest: "/verify-request",
//   },
//   callbacks: {
//     // jwt({ token, user }) {
//     //   if (user) {
//     //     token.id = user.id;
//     //     token.email = user.email;
//     //     token.image = user.image;
//     //   }
//     //   return token;
//     // },
//     // session: ({ session, user }) => ({
//     //   ...session,
//     //   user: {
//     //     ...session.user,
//     //     id: user.id,
//     //   },
//     // }),
//     // session: ({ session, user }) => {
//     //   session.user = {
//     //     ...session.user,
//     //     id: user.id,
//     //   };
//     //   return session;
//     // },
//   },
// };

// export const getServerAuthSession = () => getServerSession(authOptions);
