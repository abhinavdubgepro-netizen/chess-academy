import { NextRequest, NextResponse } from "next/server";

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

    if (demoEmails.has(normalizedEmail)) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // Send to Google Sheets
    const response = await fetch("https://script.google.com/macros/s/AKfycbw14cV-X6Sulkh7HeZAEVEpq78OAsSZevrOJNeiRCLbm0vU1qoTIZCjh8A9k_lBZPBceQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

    const text = await response.text();

    // If response is not JSON (like an error page), handle it
    let data: { success?: boolean } = {};
    try {
      data = JSON.parse(text);
    } catch {
      // Not valid JSON - check if it's an error page
      if (text.includes("<!DOCTYPE") || text.includes("<html")) {
        return NextResponse.json(
          { message: "Google Apps Script returned HTML instead of JSON. Check your script deployment." },
          { status: 502 }
        );
      }
      data = { success: response.ok };
    }

    if (data.success === false) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: `Google Sheets returned HTTP ${response.status}` },
        { status: 502 }
      );
    }

    demoEmails.add(normalizedEmail);

    return NextResponse.json(
      { message: "Demo request submitted successfully!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    );
  }
}
