import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "submissions.json");

function readSubmissions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return data ? JSON.parse(data) : [];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, age, chessLevel, preferredDate, message } = body;

    const submissions = readSubmissions();
    const existing = submissions.find((s: any) => s.email === email);
    
    if (existing) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
    }

    const newSubmission = {
      id: Date.now(),
      name,
      email,
      phone: phone || "",
      age: age || "",
      chessLevel: chessLevel || "beginner",
      preferredDate: preferredDate || "",
      message: message || "",
      status: "pending",
      submittedAt: new Date().toLocaleString("en-IN"),
    };

    submissions.push(newSubmission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));

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
    const submissions = readSubmissions();
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}