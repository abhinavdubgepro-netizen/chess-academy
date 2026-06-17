import { NextResponse } from "next/server";
import { db } from "@/db";
import { classes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allClasses = await db.select().from(classes).where(eq(classes.isActive, true));
    return NextResponse.json(allClasses);
  } catch {
    return NextResponse.json({ message: "Failed to fetch classes" }, { status: 500 });
  }
}
