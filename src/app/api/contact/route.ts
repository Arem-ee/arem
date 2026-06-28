import { NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateLimitMap.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW) {
    const count = Array.from(rateLimitMap.values()).filter(
      (t) => now - t < RATE_LIMIT_WINDOW
    ).length;
    if (count >= MAX_REQUESTS) return true;
  }
  rateLimitMap.set(ip, now);
  return false;
}

async function sendEmail(payload: ContactBody): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured — skipping email send");
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact <onboarding@resend.dev>`,
        to: [process.env.CONTACT_EMAIL ?? "hello@alexmorgan.dev"],
        subject: `Portfolio Contact: ${payload.subject}`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Subject:</strong> ${payload.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${payload.message}</p>
        `,
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters" },
      { status: 400 }
    );
  }

  const spamHoneypot = body as unknown as Record<string, string>;
  if (spamHoneypot.website) {
    return NextResponse.json({ success: true });
  }

  const sent = await sendEmail({ name, email, subject, message });

  if (!sent) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
