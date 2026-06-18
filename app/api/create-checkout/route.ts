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
      upiId: "SITE ON TEST DONT PAY", // CHANGE THIS TO YOUR REAL UPI ID
      // QR code data for desktop users
      upiLink: `SITE O TEST DONT PAY=${price}&cu=INR&tn=Course: ${courseId}`,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
