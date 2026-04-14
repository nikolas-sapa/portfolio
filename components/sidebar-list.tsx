"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ContentItem } from "@/lib/content";

type Props = {
  items: ContentItem[];
  section: string;
};

export function SidebarList({ items, section }: Props) {
  const pathname = usePathname();

  if (items.length === 0) {
    return (
      <div className="p-4 text-xs font-mono text-shell-muted">
        No entries yet.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-shell-border">
      {items.map((item) => {
        const href = `/${section}/${item.slug}`;
        const active = pathname === href;
        return (
          <li key={item.slug}>
            <Link
              href={href}
              className={[
                "block px-4 py-3 transition-colors",
                active
                  ? "bg-shell-content border-l-2 border-shell-ink"
                  : "hover:bg-shell-bg border-l-2 border-transparent",
              ].join(" ")}
            >
              <p className="text-sm text-shell-ink leading-snug line-clamp-1">
                {item.title}
              </p>
              {item.description && (
                <p className="mt-0.5 text-xs font-mono text-shell-muted line-clamp-2">
                  {item.description}
                </p>
              )}
              {item.date && (
                <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-shell-muted">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
