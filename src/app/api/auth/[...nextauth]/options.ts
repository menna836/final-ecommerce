import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiServices } from "@/services/api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Your-email@example.com" },
        password: { label: "Password", type: "password", placeholder: "***********" }
      },
      async authorize(credentials) {
        const response = await apiServices.login(credentials?.email ?? "", credentials?.password ?? "");
        if (response.message === "success") {
          return {
            id: response.user.email,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            token: response.token
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token as string;
      session.user.role = token.role as string;
      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt"
  }
};
