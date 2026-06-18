import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, age, chessLevel, preferredDate, message } = body;

    const response = await fetch("https://script.google.com/macros/s/AKfycbw14cV-X6Sulkh7HeZAEVEpq78OAsSZevrOJNeiRCLbm0vU1qoTIZCjh8A9k_lBZPBceQ/exec", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone,
        age,
        level: chessLevel,
        date: preferredDate,
        message,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { message: "You have already requested a demo with this email." },
        { status: 409 }
      );
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
