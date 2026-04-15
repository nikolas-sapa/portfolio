import { SidebarList } from "@/components/sidebar-list";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function WritingLayout({ children }: { children: ReactNode }) {
  const items = getItems("writing");
  return (
    <>
      <aside className="w-52 flex-none border-r border-[#DCDCDC] bg-[#F6F6F6] overflow-y-auto">
        <div className="px-3 pt-3 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
            Writing
          </span>
        </div>
        <SidebarList items={items} section="writing" />
      </aside>
      <main className="flex-1 bg-white overflow-y-auto">{children}</main>
    </>
  );
}
