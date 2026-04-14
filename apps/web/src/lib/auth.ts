import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

import { sendEmail } from "@/lib/email";
import { welcomeEmailTemplate } from "@/lib/emails/welcome-email";

/**
 * 🔐 Normalize email (critical consistency layer)
 */
const normalizeEmail = (email: string) =>
  email.toLowerCase().trim();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const email = normalizeEmail(credentials.email);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          if (!user.password) {
            console.warn("AUTH: OAuth user attempted credentials login", email);
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
            emailVerified: user.emailVerified, // ✅ IMPORTANT ADDITION
          };
        } catch (err) {
          console.error("AUTH ERROR (authorize):", err);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  callbacks: {
    /**
     * 🔐 JWT Core Identity
     */
    async jwt({ token, user, account }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.role = (user as any).role ?? "USER";
        token.avatar =
          (user as any).avatarUrl ||
          (user as any).image ||
          null;

        // ✅ ADD EMAIL VERIFIED TO TOKEN
        token.emailVerified =
          (user as any).emailVerified ?? null;
      }

      /**
       * Google sync fallback
       */
      if (account?.provider === "google") {
        token.avatar = token.avatar || token.picture;
      }

      return token;
    },

    /**
     * 👤 Session Layer
     */
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).email = token.email;
        (session.user as any).role = token.role;
        (session.user as any).avatar = token.avatar;

        // ✅ ADD EMAIL VERIFIED TO SESSION
        (session.user as any).emailVerified =
          token.emailVerified ?? null;
      }

      return session;
    },

    /**
     * 🔐 Safe redirect
     */
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  events: {
    async signIn({ user }) {
      if (!user?.email) return;

      try {
        const email = normalizeEmail(user.email);

        const dbUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!dbUser) return;

        const isFirstLogin = !dbUser.lastActive;

        await prisma.user.update({
          where: { id: dbUser.id },
          data: { lastActive: new Date() },
        });

        /**
         * 🚀 Non-blocking welcome email
         */
        if (isFirstLogin) {
          setTimeout(async () => {
            try {
              await sendEmail({
                to: dbUser.email,
                subject: "Welcome to Zabbot 🚀",
                html: welcomeEmailTemplate(dbUser.name ?? "Learner"),
              });
            } catch (err) {
              console.error("Welcome email failed:", err);
            }
          }, 0);
        }
      } catch (err) {
        console.error("Auth signIn event failed:", err);
      }
    },
  },

  debug: process.env.NODE_ENV === "development",
};