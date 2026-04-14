import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL;

    if (!baseUrl) {
      throw new Error("NEXTAUTH_URL is not defined");
    }

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    // =========================
    // 1. VALIDATE TOKEN
    // =========================
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/error?error=InvalidToken", baseUrl)
      );
    }

    // =========================
    // 2. FIND TOKEN RECORD
    // =========================
    const record = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.redirect(
        new URL("/auth/error?error=TokenNotFound", baseUrl)
      );
    }

    // =========================
    // 3. CHECK EXPIRY
    // =========================
    if (record.expires < new Date()) {
      return NextResponse.redirect(
        new URL("/auth/error?error=TokenExpired", baseUrl)
      );
    }

    // =========================
    // 4. UPDATE USER
    // =========================
    await prisma.user.update({
      where: { id: record.userId },
      data: {
        emailVerified: new Date(),
      },
    });

    // =========================
    // 5. DELETE TOKEN (ONE-TIME USE)
    // =========================
    await prisma.emailVerificationToken.delete({
      where: { token },
    });

    // =========================
    // 6. SUCCESS REDIRECT
    // =========================
    return NextResponse.redirect(
      new URL("/verify?status=success", baseUrl)
    );
  } catch (err) {
    console.error("VERIFY_EMAIL_ERROR:", err);

    const baseUrl = process.env.NEXTAUTH_URL || "";

    return NextResponse.redirect(
      new URL("/auth/error?error=ServerError", baseUrl)
    );
  }
}