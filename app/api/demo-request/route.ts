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

    console.log("=== DEMO REQUEST ===");
    console.log("Received email:", email);

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Valid email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const key = `demo:${normalizedEmail}`;

    console.log("Checking Redis key:", key);

    // Check Redis - try/catch to see if Redis fails
    let existing;
    try {
      existing = await redis.get(key);
      console.log("Redis GET result:", existing);
    } catch (redisError) {
      console.error("Redis GET failed:", redisError);
      return NextResponse.json(
        { message: "Database error checking duplicate" },
        { status: 500 }
      );
    }

    if (existing === "true") {
      console.log("DUPLICATE FOUND - returning 409");
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    console.log("No duplicate found, saving to Redis...");

    // Save to Redis
    try {
      await redis.set(key, "true");
      console.log("Redis SET success");
    } catch (redisSetError) {
      console.error("Redis SET failed:", redisSetError);
      return NextResponse.json(
        { message: "Database error saving request" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Demo request submitted successfully!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
