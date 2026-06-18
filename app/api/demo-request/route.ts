import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { demoRequests } from "@/db/schema";
import { eq } from "drizzle-orm";

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

    // Check if email already exists in database
    const existing = await db
      .select()
      .from(demoRequests)
      .where(eq(demoRequests.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // Insert into database
    await db.insert(demoRequests).values({
      name,
      email: normalizedEmail,
      phone: phone || null,
      age: age ? parseInt(age) : null,
      chessLevel: chessLevel || "beginner",
      preferredDate: preferredDate || null,
      message: message || null,
    });

    // Optional: backup to Google Sheets
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
    
    // Handle unique constraint violation
    if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
