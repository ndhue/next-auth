import type { NextAuthConfig } from "next-auth";

export default {
  // Actually we should define providers in here, but I used Prisma -> plz go to auth.ts file to see details
  providers: [],
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
