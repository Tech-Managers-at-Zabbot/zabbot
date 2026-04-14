import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { verificationEmailTemplate } from "@/lib/emails/verification-email";
import { sendEmail } from "@/lib/email";

const normalizeEmail = (email: string) => email.toLowerCase().trim();

// Basic email validation
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // =========================
    // 1. VALIDATION
    // =========================
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = normalizeEmail(email);

    // =========================
    // 2. CHECK EXISTING USER
    // =========================
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // =========================
    // 3. HASH PASSWORD
    // =========================
    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // 4. CREATE USER
    // =========================
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name?.trim() || null,
        role: "USER",
        status: "ACTIVE",
        emailVerified: null,
      },
    });

    // =========================
    // 5. CLEAN OLD TOKENS (SAFETY)
    // =========================
    await prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    });

    // =========================
    // 6. GENERATE TOKEN
    // =========================
    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await prisma.emailVerificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    // =========================
    // 7. BUILD VERIFY URL
    // =========================
    const baseUrl = process.env.NEXTAUTH_URL;

    if (!baseUrl) {
      throw new Error("NEXTAUTH_URL is not defined");
    }

    const verifyUrl = `${baseUrl}/verify-email?token=${token}`;

    // =========================
    // 8. SEND EMAIL
    // =========================
    await sendEmail({
      to: user.email,
      subject: "Verify your Zabbot account 🚀",
      html: verificationEmailTemplate({
        name: user.name ?? "Learner",
        verifyUrl,
      }),
    });

    // =========================
    // 9. RESPONSE
    // =========================
    return NextResponse.json(
      {
        success: true,
        message: "Verification email sent",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("SIGNUP_API_ERROR:", err);

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}