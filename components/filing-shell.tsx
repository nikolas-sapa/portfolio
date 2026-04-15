import type { ReactNode } from "react";
import { TabNav } from "./tab-nav";
import { SidebarList } from "./sidebar-list";
import type { ContentItem } from "@/lib/content";

type Props = {
  items: ContentItem[];
  section: string;
  children: ReactNode;
};

function TrafficLights() {
  return (
    <div className="flex gap-1.5 flex-none">
      <div className="w-[13px] h-[13px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
      <div className="w-[13px] h-[13px] rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
      <div className="w-[13px] h-[13px] rounded-full bg-[#28C840] border border-[#1FAD2F]" />
    </div>
  );
}

export function FilingShell({ items, section, children }: Props) {
  return (
    <div
      className="min-h-screen flex items-start justify-center p-6 md:p-12"
      style={{ background: "#E5E5EA" }}
    >
      <div
        className="w-full max-w-5xl rounded-xl overflow-hidden flex flex-col border border-black/[0.12]"
        style={{
          minHeight: "calc(100vh - 6rem)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.4) inset",
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center px-4 py-2.5 bg-[#EBEBEB] border-b border-[#CFCFCF] flex-none">
          <TrafficLights />
          <span className="flex-1 text-center text-[12px] font-semibold text-[#3d3d3d] select-none">
            nikolas.sapa
          </span>
          <div className="w-[49px] flex-none" />
        </div>

        {/* Toolbar / tabs */}
        <TabNav />

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — hidden when no items */}
          {items.length > 0 && (
            <aside className="w-52 flex-none border-r border-[#DCDCDC] bg-[#F6F6F6] overflow-y-auto">
              <div className="px-3 pt-3 pb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                  {section}
                </span>
              </div>
              <SidebarList items={items} section={section} />
            </aside>
          )}

          {/* Content */}
          <main className="flex-1 bg-white overflow-y-auto">{children}</main>
        </div>

        {/* Status bar */}
        <div className="px-4 py-1 bg-[#EBEBEB] border-t border-[#CFCFCF] flex-none">
          <span className="text-[11px] text-[#86868b]">
            {items.length > 0
              ? `${items.length} item${items.length !== 1 ? "s" : ""}`
              : "\u00A0"}
          </span>
        </div>
      </div>
    </div>
  );
}
