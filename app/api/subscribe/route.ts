import { NextRequest, NextResponse } from "next/server";

const EO_API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const EO_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

export async function POST(req: NextRequest) {
  if (!EO_API_KEY || !EO_LIST_ID) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const { email, tag } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.emailoctopus.com/lists/${EO_LIST_ID}/contacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EO_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        tags: tag ? [tag] : [],
      }),
    }
  );

  if (res.ok) {
    return NextResponse.json({ ok: true });
  }

  // Existing contact → treat as success (re-download is fine).
  // v2 returns 409 CONFLICT for a member that already exists.
  if (res.status === 409) {
    return NextResponse.json({ ok: true });
  }

  let msg = "Failed to subscribe";
  try {
    const data = await res.json();
    msg = data?.detail ?? data?.title ?? msg;
  } catch {
    /* non-JSON error body */
  }

  return NextResponse.json({ error: msg }, { status: 500 });
}
