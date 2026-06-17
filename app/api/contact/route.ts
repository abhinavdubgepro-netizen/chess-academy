import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "contact_messages.csv");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Create file with header if it doesn't exist
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "Chess Academy - Contact Messages\n\n");
    }

    // Add new submission in vertical format
    const submittedAt = new Date().toLocaleString("en-IN");
    
    const entry = [
      "═══════════════════════════════════════",
      `Name:,${name}`,
      `Email:,${email}`,
      `Subject:,${subject}`,
      `Message:,${message}`,
      `Submitted At:,${submittedAt}`,
      "═══════════════════════════════════════",
      "",
    ].join("\n");

    fs.appendFileSync(DATA_FILE, entry);

    return NextResponse.json(
      { message: "Message sent successfully!" },
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
      return NextResponse.json({ data: "No messages yet." });
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: "" });
  }
}