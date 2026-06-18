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

    // Send to Google Sheets
    const response = await fetch("https://script.google.com/macros/s/AKfycbw14cV-X6Sulkh7HeZAEVEpq78OAsSZevrOJNeiRCLbm0vU1qoTIZCjh8A9k_lBZPBceQ/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    // Get response text
    const text = await response.text();
    console.log("Apps Script response:", text.substring(0, 200));

    // Try to parse JSON
    let data: { success?: boolean } = {};
    try {
      data = JSON.parse(text);
    } catch {
      // If not JSON, check if it's an error page
      if (text.includes("error") || text.includes("Error")) {
        return NextResponse.json(
          { message: "Google Sheets returned an error" },
          { status: 502 }
        );
      }
      // Otherwise assume success if HTTP status is OK
      data = { success: response.ok };
    }

    // If Apps Script explicitly says failure
    if (data.success === false) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // If HTTP failed and we couldn't parse success
    if (!response.ok && data.success !== true) {
      return NextResponse.json(
        { message: "Failed to save request. Please try again." },
        { status: 502 }
      );
    }

    // Only mark email as used AFTER successful save
    demoEmails.add(normalizedEmail);

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
