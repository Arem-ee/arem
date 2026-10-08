/**
 * Vercel serverless function: contact form → email via Resend.
 * Env: RESEND_API_KEY (required to send), CONTACT_EMAIL (defaults to portfolio owner).
 */

interface ContactBody {
  name?: unknown;
  email?: unknown;
  need?: unknown;
  message?: unknown;
  [key: string]: unknown;
}

interface JsonResponseLike {
  status: (code: number) => JsonResponseLike;
  json: (body: unknown) => JsonResponseLike;
}

interface RequestLike {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body: ContactBody | null;
}

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= MAX_REQUESTS) {
    rateLimitMap.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

async function sendEmail(payload: {
  name: string;
  email: string;
  need: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured – skipping email send");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL ?? "toromadeadesina@gmail.com"],
        reply_to: payload.email,
        subject: `Portfolio contact: ${payload.need || "inquiry"} — ${payload.name}`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Need:</strong> ${payload.need}</p>
          <p><strong>Message:</strong></p>
          <p>${payload.message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default async function handler(req: RequestLike, res: JsonResponseLike) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    (Array.isArray(req.headers["x-forwarded-for"])
      ? req.headers["x-forwarded-for"][0]
      : req.headers["x-forwarded-for"]) ?? "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const body = req.body ?? {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const need = typeof body.need === "string" ? body.need.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (message.length < 10) {
    return res.status(400).json({ error: "Message must be at least 10 characters" });
  }

  // Honeypot: silently accept spam
  const honeypot =
    typeof body["_bot_trap"] === "string" ? body["_bot_trap"].trim() : "";
  if (honeypot.length > 0) {
    return res.status(200).json({ success: true });
  }

  const sent = await sendEmail({ name, email, need, message });

  if (!sent) {
    return res.status(500).json({ error: "Failed to send message. Please try again later." });
  }

  return res.status(200).json({ success: true });
}
