// lib/auth.ts
import axios, { isAxiosError } from "axios";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./schemas/schemas";
import { ZodError } from "zod";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      role: "ADMIN" | "MODERATOR" | "USER" | "GUEST";
      image: string;
      isActive: boolean;
      accessToken: string;
      tokenType: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },

      async authorize(credentials) {
        try {
          let user = null;
          const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

          const { email, password } = await signInSchema.parseAsync(credentials);

          const response = await axios.post(loginUrl, {
            email,
            password,
          });

          if (response.status === 200) {
            user = response.data;
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error.errors);
            return null;
          }

          if (isAxiosError(error)) {
            if (error.response?.status === 404) throw new Error("User not found");
            if (error.response?.status === 401) throw new Error("Password Incorrct");
          }
          console.error("Authorization error:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  // pages: {
  // signIn: "/auth/login",
  //   // signOut: "/auth/signout",
  //   // error: "/auth/error",
  // },
});
