import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Keep bcryptjs if you want zero-config, or switch to bcrypt for speed
import { prisma } from "@/lib/prisma";

const normalizeEmail = (email: string) => email.toLowerCase().trim();

// Simple regex for basic validation
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // 1. Better Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);

    // 2. Check existence
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true } // Efficiency: Only select the ID, not the whole record
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Atomic Create
    // Note: Ensure you've run 'npx prisma db push' for the isDeleted column!
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: name?.trim() || null,
        role: "USER",
        status: "ACTIVE",
        // Default values from schema are usually enough, 
        // but explicit assignment here is fine for clarity.
        xp: 0,
        hearts: 5,
        isOnboarded: false,
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
    }, { status: 201 }); 

  } catch (err) {
    // Log the error for internal debugging
    console.error("SIGNUP_API_ERROR:", err);

    return NextResponse.json(
      { error: "An unexpected error occurred" }, 
      { status: 500 }
    );
  }
}