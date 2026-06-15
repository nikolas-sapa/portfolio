"use client";

import { useState, type ReactNode } from "react";

type Props = {
  tag: string;
  resourceName: string;
  downloadUrl?: string;
  children?: ReactNode;
};

export function EmailGate({ tag, downloadUrl, resourceName, children }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <>
        <div className="my-8 p-6 border border-[#EBEBEB] rounded-lg">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] mb-3">
            You&apos;re in
          </p>
          <p className="text-sm text-[#1d1d1f] mb-4">
            {downloadUrl
              ? "Download starts below. Check your inbox — you'll also get the weekly build log."
              : "Unlocked. Check your inbox — you'll also get the weekly build log."}
          </p>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-[#1d1d1f] text-white rounded-md hover:bg-[#333] transition-colors"
            >
              Download {resourceName} ↓
            </a>
          )}
        </div>
        {children}
      </>
    );
  }

  return (
    <div className="my-8 p-6 border border-[#EBEBEB] rounded-lg">
      <p className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] mb-3">
        {downloadUrl ? "Free download" : "Read the full breakdown"}
      </p>
      <p className="text-sm text-[#1d1d1f] mb-4">
        Enter your email to {downloadUrl ? "get instant access" : "unlock the rest"}. You&apos;ll also receive the weekly build log — unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 text-sm px-3 py-2 border border-[#DCDCDC] rounded-md focus:outline-none focus:border-[#1d1d1f] transition-colors"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="text-sm font-medium px-4 py-2 bg-[#1d1d1f] text-white rounded-md hover:bg-[#333] transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Get it"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
      )}
    </div>
  );
}
