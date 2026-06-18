import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory store for demo emails (resets on server restart)
const demoEmails = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, age, chessLevel, preferredDate, message } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate
    if (demoEmails.has(normalizedEmail)) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // Send email via Resend (same as contact API)
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yourgmail@gmail.com", // ← CHANGE TO YOUR EMAIL
      subject: `New Demo Request from ${name}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${normalizedEmail}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Age:</strong> ${age || "N/A"}</p>
        <p><strong>Level:</strong> ${chessLevel}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate || "N/A"}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    });

    // Check if email actually sent
    if (response.error) {
      console.error("Email error:", response.error);
      return NextResponse.json(
        { message: "Email failed to send" },
        { status: 500 }
      );
    }

    // Mark email as used
    demoEmails.add(normalizedEmail);

    return NextResponse.json(
      { message: "Demo request submitted successfully!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
