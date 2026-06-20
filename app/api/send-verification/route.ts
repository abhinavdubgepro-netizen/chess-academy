import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Store codes temporarily (use Redis in production)
const verificationCodes = new Map<string, string>();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Valid email required" }, { status: 400 });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code (expires in 10 minutes)
    verificationCodes.set(email.toLowerCase().trim(), code);
    setTimeout(() => verificationCodes.delete(email.toLowerCase().trim()), 10 * 60 * 1000);

    // Send email with code
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Verification Code - Fusion Chess Academy",
      html: `
        <h2>Verify Your Email</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to send code" }, { status: 500 });
  }
}

// Verify code
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const code = req.nextUrl.searchParams.get("code");

  if (!email || !code) {
    return NextResponse.json({ valid: false });
  }

  const storedCode = verificationCodes.get(email.toLowerCase().trim());
  return NextResponse.json({ valid: storedCode === code });
}
