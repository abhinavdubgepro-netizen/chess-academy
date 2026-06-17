import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // ⚠️ temporary sender
      to: "yourgmail@gmail.com",     // 👈 CHANGE THIS
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // 🔥 IMPORTANT: check result
    if (response.error) {
      console.error("Email error:", response.error);

      return NextResponse.json(
        { message: "Email failed to send" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
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
