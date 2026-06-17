import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "demo_requests.csv");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, age, chessLevel, preferredDate, message } = body;

    // Check if email already exists
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      if (data.includes(`Email:,${email}`)) {
        return NextResponse.json(
          { message: "You have already requested a demo with this email." },
          { status: 409 }
        );
      }
    }

    // Create file with header if it doesn't exist
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "Chess Academy - Demo Requests\n\n");
    }

    // Add new submission in vertical format
    const submittedAt = new Date().toLocaleString("en-IN");
    
    const entry = [
      "═══════════════════════════════════════",
      `Name:,${name}`,
      `Email:,${email}`,
      `Phone:,${phone || "Not provided"}`,
      `Age:,${age || "Not provided"}`,
      `Chess Level:,${chessLevel || "beginner"}`,
      `Preferred Date:,${preferredDate || "Not provided"}`,
      `Message:,${message || "Not provided"}`,
      `Submitted At:,${submittedAt}`,
      "═══════════════════════════════════════",
      "",
    ].join("\n");

    fs.appendFileSync(DATA_FILE, entry);

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

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ data: "No submissions yet." });
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: "" });
  }
}