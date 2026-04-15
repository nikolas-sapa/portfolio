import { TabNav } from "@/components/tab-nav";
import type { ReactNode } from "react";

export default function WebDevLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-shell-bg flex items-start justify-center p-6 md:p-12">
      <div
        className="w-full max-w-5xl border border-shell-border rounded-sm shadow-sm overflow-hidden flex flex-col"
        style={{ minHeight: "calc(100vh - 6rem)" }}
      >
        <TabNav />
        <div className="flex-1 bg-shell-sidebar flex items-center justify-center p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
