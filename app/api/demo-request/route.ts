import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory store for demo emails
const demoEmails = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, age, classtype, preferredDate, message } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Valid email required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate
    if (demoEmails.has(normalizedEmail)) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // Send email to YOUR verified email
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "abhinavdubgeispro12@gmail.com", // ← YOUR VERIFIED EMAIL
      subject: `New Demo Request from ${name}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${normalizedEmail}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Age:</strong> ${age || "N/A"}</p>
        <p><strong>Chess Type:</strong> ${classtype}</p>
        <p><strong>Date:</strong> ${preferredDate || "N/A"}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    });

    if (response.error) {
      return NextResponse.json(
        { message: `Email failed: ${response.error.message}` },
        { status: 500 }
      );
    }

    demoEmails.add(normalizedEmail);

    return NextResponse.json(
      { message: "Demo request submitted successfully!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
