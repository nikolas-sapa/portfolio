import { FinderSidebar } from "@/components/finder-sidebar";
import { getTreeLite } from "@/lib/content";
import type { ReactNode } from "react";

const SUGGESTIONS = ["agents", "hooks", "MCP", "memory", "skills", "settings"];

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  // Lite tree: titles/links only, no MDX bodies (keeps gated content out of
  // the client payload — the sidebar never renders article content anyway).
  const tree = getTreeLite("resources");
  return (
    <>
      <aside className="flex-none md:w-64 md:border-r border-[#DCDCDC] bg-[#F6F6F6] md:overflow-y-auto">
        <FinderSidebar
          tree={tree}
          section="resources"
          label="Resources"
          suggestions={SUGGESTIONS}
        />
      </aside>
      <main className="flex-1 bg-white overflow-y-auto min-h-0">{children}</main>
    </>
  );
}
