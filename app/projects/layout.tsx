import { FinderSidebar } from "@/components/finder-sidebar";
import { getItems } from "@/lib/content";
import type { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const items = getItems("projects");
  return (
    <>
      <aside className="flex-none md:w-52 md:border-r border-[#DCDCDC] bg-[#F6F6F6] md:overflow-y-auto">
        <FinderSidebar items={items} section="projects" label="Projects" />
      </aside>
      <main className="flex-1 bg-white overflow-y-auto min-h-0">{children}</main>
    </>
  );
}
