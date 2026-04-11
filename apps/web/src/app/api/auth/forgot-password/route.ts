import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Prevent email enumeration (always return success)
  if (!user) {
    return NextResponse.json({ success: true });
  }

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    },
  });

  // Use SERVER URL (important for security + correctness)
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
  const resetLink = `${baseUrl}/reset-password?token=${token}`;

  try {
    await sendEmail({
      to: email,
      subject: "Reset your Zabbot password 🔐",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#162B6E;">Password Reset Request</h2>

          <p>You requested a password reset for your Zabbot account.</p>

          <a href="${resetLink}"
            style="
              display:inline-block;
              padding:10px 16px;
              background:#162B6E;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
              margin-top:10px;
            ">
            Reset Password
          </a>

          <p style="margin-top:20px; font-size:12px; color:#666;">
            If you did not request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }

  return NextResponse.json({ success: true });
}