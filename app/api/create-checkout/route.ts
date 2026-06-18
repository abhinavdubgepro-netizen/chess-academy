import { NextRequest, NextResponse } from "next/server";

// For now, use a simple in-memory store (replace with Stripe later)
const pendingOrders = new Map<string, { courseId: string; price: number }>();

export async function POST(req: NextRequest) {
  try {
    const { courseId, price } = await req.json();

    // Generate a unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    // Store order info
    pendingOrders.set(orderId, { courseId, price });

    // For now, return a simple UPI payment link
    // Replace this with Stripe/Razorpay later
    const upiId = "yourupi@okaxis"; // CHANGE THIS TO YOUR UPI ID

    // Create UPI deep link
    const upiLink = `upi://pay?pa=${upiId}&pn=Chess Academy&am=${price}&cu=INR&tn=Course: ${courseId}`;

    return NextResponse.json({
      url: upiLink,
      orderId,
      // Also show QR code data for desktop users
      qrData: `upi://pay?pa=${upiId}&pn=Chess Academy&am=${price}&cu=INR`,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
