import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory store for demo emails
const demoEmails = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, age, chessLevel, preferredDate, message } = body;

    console.log("=== DEMO REQUEST START ===");
    console.log("Received:", { name, email, phone, age, chessLevel, preferredDate, message });

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Valid email required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log("Normalized email:", normalizedEmail);

    // Check duplicate
    if (demoEmails.has(normalizedEmail)) {
      console.log("Duplicate found:", normalizedEmail);
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    console.log("Sending email via Resend...");
    console.log("API Key exists:", !!process.env.RESEND_API_KEY);

    // Send email
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yourgmail@gmail.com", // ← MAKE SURE THIS IS YOUR VERIFIED EMAIL
      subject: `New Demo Request from ${name}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${normalizedEmail}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Age:</strong> ${age || "N/A"}</p>
        <p><strong>Level:</strong> ${chessLevel}</p>
        <p><strong>Date:</strong> ${preferredDate || "N/A"}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    });

    console.log("Resend response:", JSON.stringify(response, null, 2));

    if (response.error) {
      console.error("Resend error:", response.error);
      return NextResponse.json(
        { message: `Email failed: ${JSON.stringify(response.error)}` },
        { status: 500 }
      );
    }

    console.log("Email sent successfully, adding to demoEmails");
    demoEmails.add(normalizedEmail);

    return NextResponse.json(
      { message: "Demo request submitted successfully!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("=== SERVER ERROR ===");
    console.error(error);
    return NextResponse.json(
      { message: `Server error: ${error instanceof Error ? error.message : "Unknown"}` },
      { status: 500 }
    );
  }
}
