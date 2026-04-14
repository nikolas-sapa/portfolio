import type { ReactNode } from "react";
import { TabNav } from "./tab-nav";
import { SidebarList } from "./sidebar-list";
import type { ContentItem } from "@/lib/content";

type Props = {
  items: ContentItem[];
  section: string;
  children: ReactNode;
};

export function FilingShell({ items, section, children }: Props) {
  return (
    <div className="min-h-screen bg-shell-bg flex items-start justify-center p-6 md:p-12">
      <div className="w-full max-w-5xl border border-shell-border rounded-sm shadow-sm overflow-hidden flex flex-col min-h-[calc(100vh-6rem)]">
        {/* Tab bar */}
        <TabNav />

        {/* Two-panel body */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 flex-none border-r border-shell-border bg-shell-sidebar overflow-y-auto">
            <div className="px-4 py-3 border-b border-shell-border">
              <span className="text-[11px] font-mono uppercase tracking-widest text-shell-muted">
                {section}
              </span>
            </div>
            <SidebarList items={items} section={section} />
          </aside>

          {/* Content panel */}
          <main className="flex-1 bg-shell-content overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
