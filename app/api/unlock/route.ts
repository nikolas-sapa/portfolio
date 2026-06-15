import { NextRequest, NextResponse } from "next/server";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getItem, splitGate } from "@/lib/content";

const EO_API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const EO_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

// Slug parts are author-defined folder/file names. Reject anything else so a
// crafted slug can't traverse outside the content directory.
const SLUG_PART = /^[a-z0-9-]+$/;

async function subscribe(email: string, tag?: string): Promise<true | string> {
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

  // 409 = already a contact; treat re-unlock as fine.
  if (res.ok || res.status === 409) return true;

  try {
    const data = await res.json();
    return data?.detail ?? data?.title ?? "Failed to subscribe";
  } catch {
    return "Failed to subscribe";
  }
}

export async function POST(req: NextRequest) {
  if (!EO_API_KEY || !EO_LIST_ID) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const { email, slug, tag } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Missing resource" }, { status: 400 });
  }

  const parts = slug.split("/");
  if (parts.length === 0 || parts.length > 4 || !parts.every((p) => SLUG_PART.test(p))) {
    return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
  }

  const item = getItem("resources", parts);
  if (!item) {
    return NextResponse.json({ error: "Resource not found" }, { status: 404 });
  }

  const { gated } = splitGate(item.content);
  if (!gated) {
    return NextResponse.json({ error: "Resource is not gated" }, { status: 400 });
  }

  // Capture the email before handing over the content.
  const subResult = await subscribe(email, typeof tag === "string" ? tag : undefined);
  if (subResult !== true) {
    return NextResponse.json({ error: subResult }, { status: 502 });
  }

  const mdx = await serialize(gated, {
    mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
  });

  return NextResponse.json({ mdx });
}
