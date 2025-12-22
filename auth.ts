import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { credentialsProvider } from "./auth.providers";
import authConfig from "./auth.config";
import db from "./lib/db";
import { getUserById } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  // --- authConfig ---
  // Edge-safe configuration (pages, session strategy, callbacks) is safe to merge here.
  // These do not contain Node-only logic and can be shared with middleware if needed.
  ...authConfig,

  // --- PrismaAdapter(db) ---
  // This must be placed here in auth.ts (Node runtime) because Prisma is Node.js only.
  // It cannot be imported into any Edge runtime code, such as middleware, because Edge
  // does not support Node native modules like `node:path` or `node:process`.
  adapter: PrismaAdapter(db),

  // --- providers ---
  // All login providers (Credentials, OAuth like GitHub) must be defined here in Node runtime.
  // Providers often rely on Node modules (bcrypt, database access, crypto),
  // so they cannot be imported or used in Edge runtime code.
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentialsProvider,
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
});
