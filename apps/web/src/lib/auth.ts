import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

import { sendEmail } from "@/lib/email";
import { welcomeEmailTemplate } from "@/lib/emails/welcome-email";

/**
 * 🔐 Centralized email normalization (IMPORTANT BEST PRACTICE)
 */
const normalizeEmail = (email: string) => email.toLowerCase().trim();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // ✅ BEST PRACTICE (no throw)
        }

        const email = normalizeEmail(credentials.email);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
        };
      },
    }),
  ],

 pages: {
  signIn: "/login",
  error: "/auth/error",
},

  callbacks: {
    /**
     * 🔐 SAFE redirect (prevents open redirect abuse)
     */
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }

      return session;
    },
  },

  events: {
    async signIn({ user }) {
      if (!user?.id) return;

      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            lastActive: true,
            email: true,
            name: true,
          },
        });

        if (!dbUser) return;

        const isFirstLogin = dbUser.lastActive === null;

        await prisma.user.update({
          where: { id: user.id },
          data: { lastActive: new Date() },
        });

        if (isFirstLogin && dbUser.email) {
          await sendEmail({
            to: dbUser.email,
            subject: "Welcome to Zabbot 🚀",
            html: welcomeEmailTemplate(dbUser.name ?? "Learner"),
          });
        }
      } catch (err) {
        console.error("Auth signIn event failed:", err);
      }
    },
  },

  debug: process.env.NODE_ENV === "development",
};