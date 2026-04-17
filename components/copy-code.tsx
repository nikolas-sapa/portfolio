"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCode({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ref.current?.textContent ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre ref={ref} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded text-[11px] opacity-0 group-hover:opacity-100 transition-opacity bg-white/[0.12] hover:bg-white/[0.22] text-[#aaa] hover:text-white"
      >
        {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
