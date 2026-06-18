import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { courseId, price } = await req.json();

    // Validate
    if (!courseId || !price) {
      return NextResponse.json(
        { message: "Course ID and price required" },
        { status: 400 }
      );
    }

    // For now, return payment info (replace with Stripe/Razorpay later)
    return NextResponse.json({
      success: true,
      courseId,
      price,
      // UPI ID for payment
      upiId: "yourupi@okaxis", // CHANGE THIS TO YOUR REAL UPI ID
      // QR code data for desktop users
      upiLink: `upi://pay?pa=yourupi@okaxis&pn=Chess Academy&am=${price}&cu=INR&tn=Course: ${courseId}`,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
