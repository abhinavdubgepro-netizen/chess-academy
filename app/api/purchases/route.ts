import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// GET — check if user purchased a course
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const courseId = req.nextUrl.searchParams.get("courseId");

  if (!email || !courseId) {
    return NextResponse.json({ purchased: false });
  }

  const key = `purchase:${email.toLowerCase().trim()}:${courseId}`;
  const purchased = await redis.get(key);

  return NextResponse.json({ purchased: purchased === "true" });
}

// POST — save a purchase
export async function POST(req: NextRequest) {
  const { email, courseId } = await req.json();

  if (!email || !courseId) {
    return NextResponse.json({ message: "Email and courseId required" }, { status: 400 });
  }

  const key = `purchase:${email.toLowerCase().trim()}:${courseId}`;
  await redis.set(key, "true");

  return NextResponse.json({ success: true });
}
