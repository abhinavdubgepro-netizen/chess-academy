import { NextRequest, NextResponse } from "next/server";

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

    // Check if email already requested a demo
    if (demoEmails.has(normalizedEmail)) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // Mark email as used
    demoEmails.add(normalizedEmail);

    // Send to Google Sheets
    const response = await fetch("https://script.google.com/macros/s/AKfycbw14cV-X6Sulkh7HeZAEVEpq78OAsSZevrOJNeiRCLbm0vU1qoTIZCjh8A9k_lBZPBceQ/exec", {
      method: "POST",
      body: JSON.stringify({
        name,
        email: normalizedEmail,
        phone,
        age,
        level: chessLevel,
        date: preferredDate,
        message,
      }),
    });

    // Handle non-JSON responses from Apps Script
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // If Apps Script doesn't return JSON, assume success if HTTP 200
      data = { success: response.ok };
    }

    if (!data.success && response.ok === false) {
      // Remove from set if Google Sheets failed
      demoEmails.delete(normalizedEmail);
      return NextResponse.json(
        { message: "Failed to save request. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Demo request submitted successfully!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
