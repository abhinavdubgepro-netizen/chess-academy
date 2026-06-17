import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONTACT_FILE = path.join(process.cwd(), "contacts.json");

function readContacts() {
  if (!fs.existsSync(CONTACT_FILE)) return [];
  const data = fs.readFileSync(CONTACT_FILE, "utf-8");
  return data ? JSON.parse(data) : [];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    const contacts = readContacts();
    
    const newContact = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toLocaleString("en-IN"),
    };

    contacts.push(newContact);
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2));

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = readContacts();
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}