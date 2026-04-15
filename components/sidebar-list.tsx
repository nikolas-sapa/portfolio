"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ContentItem } from "@/lib/content";

type Props = {
  items: ContentItem[];
  section: string;
};

function DocIcon({ active }: { active: boolean }) {
  return (
    <svg
      className="w-4 h-4 flex-none"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 2H10L13 5V14H3V2Z"
        fill={active ? "rgba(255,255,255,0.9)" : "#fff"}
        stroke={active ? "rgba(255,255,255,0.6)" : "#C0C0C0"}
        strokeWidth="0.8"
      />
      <path d="M10 2V5H13" fill="none" stroke={active ? "rgba(255,255,255,0.6)" : "#C0C0C0"} strokeWidth="0.8" />
      <line x1="5" y1="7.5" x2="11" y2="7.5" stroke={active ? "rgba(255,255,255,0.5)" : "#D0D0D0"} strokeWidth="0.7" />
      <line x1="5" y1="9.5" x2="11" y2="9.5" stroke={active ? "rgba(255,255,255,0.5)" : "#D0D0D0"} strokeWidth="0.7" />
      <line x1="5" y1="11.5" x2="9" y2="11.5" stroke={active ? "rgba(255,255,255,0.5)" : "#D0D0D0"} strokeWidth="0.7" />
    </svg>
  );
}

export function SidebarList({ items, section }: Props) {
  const pathname = usePathname();

  return (
    <ul className="py-1 px-1">
      {items.map((item) => {
        const href = `/${section}/${item.slug}`;
        const active = pathname === href;
        return (
          <li key={item.slug}>
            <Link
              href={href}
              className={[
                "flex items-start gap-1.5 px-2 py-[3px] rounded cursor-pointer transition-colors",
                active
                  ? "bg-[#0064D2] text-white"
                  : "text-[#1d1d1f] hover:bg-black/[0.06]",
              ].join(" ")}
            >
              <DocIcon active={active} />
              <div className="min-w-0">
                <p className="text-[12px] leading-snug truncate">{item.title}</p>
                {item.date && (
                  <p
                    className={[
                      "text-[10px] mt-0.5",
                      active ? "text-white/70" : "text-[#86868b]",
                    ].join(" ")}
                  >
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
