"use client";
import { useState } from "react";

interface Props {
  tag?: string;
  placeholder?: string;
  buttonText?: string;
}

export function EmailCapture({ tag, placeholder = "your@email.com", buttonText = "Subscribe" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-xs text-[#86868b] font-mono">You&apos;re in. Check your inbox.</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 text-xs border border-[#EBEBEB] rounded px-3 py-2 text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#1d1d1f] min-w-0"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-xs px-3 py-2 bg-[#1d1d1f] text-white rounded hover:bg-[#333] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "..." : buttonText}
        </button>
      </form>
      {status === "error" && <p className="text-xs text-red-500 mt-1">Something went wrong.</p>}
    </>
  );
}
