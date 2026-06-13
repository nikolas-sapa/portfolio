"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Me",        href: "/me"        },
  { label: "Projects",  href: "/projects"  },
  { label: "Dev Work",  href: "/webdev"    },
  { label: "Writing",   href: "/writing"   },
  { label: "Resources", href: "/resources" },
  { label: "Timeline",  href: "/timeline"  },
  { label: "Contact",   href: "/contact"   },
];

export function TabNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 bg-[#EBEBEB] border-b border-[#DCDCDC] flex-none overflow-x-auto">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "px-2.5 py-1 rounded text-[12px] whitespace-nowrap transition-colors select-none",
              active
                ? "bg-[#0064D2] text-white"
                : "text-[#3d3d3d] hover:bg-black/[0.08]",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
