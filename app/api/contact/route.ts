import { NextResponse } from "next/server";

// Stub endpoint: currently logs the submission server-side. Wire this up to
// an email provider (Resend, SendGrid, Postmark, etc.) or a database before
// going live — see README.md "Contact form" section.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("[contact-form] New submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
