import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

// ✉️ EMAIL SYSTEM
import { sendEmail } from "@/lib/email";
import { welcomeEmailTemplate } from "@/lib/emails/welcome-email";

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
          throw new Error("Missing email or password");
        }

        const email = credentials.email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid login credentials");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid login credentials");
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
    error: "/login",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      // 🔐 SAFE GUARD (prevents TS crash + runtime crash)
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        } as typeof session.user & {
          id: string;
        };
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