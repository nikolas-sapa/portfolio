import { FilingShell } from "@/components/filing-shell";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  const items = getItems("resources");
  return (
    <FilingShell items={items} section="resources">
      {children}
    </FilingShell>
  );
}
