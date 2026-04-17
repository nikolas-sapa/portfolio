import Link from "next/link";
import { getTree, type ContentItem, type ContentFolder } from "@/lib/content";

export const metadata = {
  title: "Resources — Nikolas Sapalidis",
};

type Row = {
  href: string;
  name: string;
  kind: string;
  modified: string;
  isFolder: boolean;
};

function formatDate(raw: string): string {
  if (!raw) return "—";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function latestDate(items: ContentItem[]): string {
  const dates = items.map((i) => i.date).filter(Boolean).sort();
  return dates[dates.length - 1] ?? "";
}

function buildRows(): Row[] {
  const tree = getTree("resources");

  const folderRows: Row[] = tree.folders.map((f: ContentFolder) => {
    const firstItem =
      f.items.find((i) => i.slugParts[i.slugParts.length - 1] !== "index") ??
      f.items[0];
    return {
      href: firstItem ? `/resources/${firstItem.slug}` : `/resources`,
      name: f.slug,
      kind: "Folder",
      modified: formatDate(latestDate(f.items)),
      isFolder: true,
    };
  });

  const fileRows: Row[] = tree.files.map((item) => ({
    href: `/resources/${item.slug}`,
    name: `${item.slug}.md`,
    kind: "Markdown Document",
    modified: formatDate(item.date),
    isFolder: false,
  }));

  return [...folderRows, ...fileRows];
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M1 4.5C1 3.67 1.67 3 2.5 3H6L7.5 4.5H13.5C14.33 4.5 15 5.17 15 6V12.5C15 13.33 14.33 14 13.5 14H2.5C1.67 14 1 13.33 1 12.5V4.5Z"
        fill="#7BA7E8"
        stroke="#5A8ED4"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 2H10L13 5V14H3V2Z" fill="#fff" stroke="#C0C0C0" strokeWidth="0.8" />
      <path d="M10 2V5H13" fill="none" stroke="#C0C0C0" strokeWidth="0.8" />
      <line x1="5" y1="7.5" x2="11" y2="7.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="9.5" x2="11" y2="9.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="11.5" x2="9" y2="11.5" stroke="#C0C0C0" strokeWidth="0.7" />
    </svg>
  );
}

export default function ResourcesIndex() {
  const rows = buildRows();

  return (
    <div>
      <div className="flex items-center gap-4 px-4 py-1.5 border-b border-[#E5E5E5] bg-[#FAFAFA] sticky top-0 z-10">
        <span className="flex-1 text-[11px] font-medium text-[#86868b] select-none">
          Name
        </span>
        <span className="w-36 text-[11px] font-medium text-[#86868b] select-none">
          Date Modified
        </span>
        <span className="w-44 text-[11px] font-medium text-[#86868b] select-none">
          Kind
        </span>
      </div>

      {rows.length === 0 ? (
        <p className="p-6 text-[12px] text-[#86868b]">Empty folder</p>
      ) : (
        rows.map((row) => (
          <Link
            key={row.href + row.name}
            href={row.href}
            className="flex items-center gap-4 px-4 py-[5px] hover:bg-[#F0F0F0] border-b border-[#F0F0F0] last:border-0"
          >
            <div className="flex-1 flex items-center gap-2 min-w-0">
              {row.isFolder ? (
                <FolderIcon className="w-4 h-4 flex-none" />
              ) : (
                <FileIcon className="w-4 h-4 flex-none" />
              )}
              <span className="text-[13px] text-[#1d1d1f] truncate">
                {row.name}
              </span>
            </div>
            <span className="w-36 text-[11px] text-[#86868b] flex-none">
              {row.modified}
            </span>
            <span className="w-44 text-[11px] text-[#86868b] flex-none">
              {row.kind}
            </span>
          </Link>
        ))
      )}
    </div>
  );
}
