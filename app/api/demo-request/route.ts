import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

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

    // Check Redis if email already requested demo
    const key = `demo:${normalizedEmail}`;
    const existing = await redis.get(key);

    if (existing === "true") {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // Save to Redis (persists forever)
    await redis.set(key, "true");

    // Also save to Google Sheets (optional backup)
    try {
      await fetch("https://script.google.com/macros/s/AKfycbw14cV-X6Sulkh7HeZAEVEpq78OAsSZevrOJNeiRCLbm0vU1qoTIZCjh8A9k_lBZPBceQ/exec", {
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
    } catch (sheetError) {
      console.error("Google Sheet backup failed:", sheetError);
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
