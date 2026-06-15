import { NextRequest, NextResponse } from "next/server";

const EO_API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const EO_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

export async function POST(req: NextRequest) {
  if (!EO_API_KEY || !EO_LIST_ID) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const { email, tag } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const res = await fetch(
    `https://emailoctopus.com/api/1.6/lists/${EO_LIST_ID}/contacts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: EO_API_KEY,
        email_address: email,
        status: "SUBSCRIBED",
        tags: tag ? [tag] : [],
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    const msg = data?.error?.message ?? "Failed to subscribe";
    if (msg.toLowerCase().includes("already subscribed")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
