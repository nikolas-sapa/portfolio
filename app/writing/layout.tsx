import { FilingShell } from "@/components/filing-shell";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function WritingLayout({ children }: { children: ReactNode }) {
  const items = getItems("writing");
  return (
    <FilingShell items={items} section="writing">
      {children}
    </FilingShell>
  );
}
