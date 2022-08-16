import NextAuth, { NextAuthOptions } from "next-auth";
import AtlassianProvider from "next-auth/providers/atlassian";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    AtlassianProvider({
      clientId: process.env.ATLASSIAN_CLIENT_ID || "",
      clientSecret: process.env.ATLASSIAN_CLIENT_SECRET || "",
      // @ts-ignore
      scope:
        "write:jira-work read:jira-work read:jira-user offline_access read:me",
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
