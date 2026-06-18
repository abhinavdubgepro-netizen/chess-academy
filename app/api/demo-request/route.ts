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
      return NextResponse.json({ message: "Valid email required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const key = `demo:${normalizedEmail}`;

    // Check Redis
    console.log("Checking Redis for key:", key);
    const existing = await redis.get(key);
    console.log("Redis result:", existing);

    if (existing === "true") {
      console.log("Duplicate found for:", normalizedEmail);
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    // Save to Redis
    console.log("Saving to Redis:", key);
    await redis.set(key, "true");
    console.log("Saved successfully");

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
