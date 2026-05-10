import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, phone, message } = body as Record<string, string>;

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Name, email, phone, and message are required." },
      { status: 400 }
    );
  }

  // In production, this would persist the inquiry to a database
  // and trigger a notification to the florist
  console.log("[BloomBox] New inquiry received:", {
    name,
    email,
    phone,
    occasion: body.occasion || "Not specified",
    message,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    message: "Your inquiry has been received. We'll get back to you within 24 hours.",
  });
}
