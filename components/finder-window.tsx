"use client";

import { useState, useCallback } from "react";
import { ChevronRight, ChevronDown, ExternalLink } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FileNode = {
  id: string;
  name: string;
  type: "file";
  kind: string;
  modified: string;
  url?: string;
  preview: string;
};

type FolderNode = {
  id: string;
  name: string;
  type: "folder";
  modified: string;
  children: TreeNode[];
};

type TreeNode = FileNode | FolderNode;

// ─── Data ────────────────────────────────────────────────────────────────────

const ROOT: FolderNode = {
  id: "root",
  name: "nikolas.sapa",
  type: "folder",
  modified: "Apr 15, 2026",
  children: [
    {
      id: "about",
      name: "About.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "Solo founder, indie hacker, developer, entrepreneur, creator.\n\nBased in Greece. I build products from zero to shipped — clean, fast, design-led web experiences.\n\nI've been building on the web for years across design, development, and product. I take on client work for companies that want something that actually looks and works great.",
    },
    {
      id: "services",
      name: "Services",
      type: "folder",
      modified: "Apr 15, 2026",
      children: [
        {
          id: "websites",
          name: "Websites.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Marketing sites, portfolios, and brand presences.\n\nClean, fast, SEO-optimized. Built to represent your brand well and load instantly.",
        },
        {
          id: "web-apps",
          name: "Web Apps.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "Full-stack web applications.\n\nFrom MVPs to production-grade apps. Next.js, React, TypeScript, Supabase. Auth, databases, APIs — the whole stack.",
        },
        {
          id: "landing-pages",
          name: "Landing Pages.md",
          type: "file",
          kind: "Markdown Document",
          modified: "Apr 15, 2026",
          preview:
            "High-converting, design-led landing pages.\n\nBuilt to rank and to convert. Clear hierarchy, strong copy structure, fast load times.",
        },
      ],
    },
    {
      id: "work",
      name: "Work",
      type: "folder",
      modified: "Apr 15, 2026",
      children: [
        {
          id: "portfolio",
          name: "nikolassapa.vercel.app",
          type: "file",
          kind: "URL",
          modified: "Feb 1, 2026",
          url: "https://nikolassapa.vercel.app",
          preview:
            "My web development portfolio.\n\nShowcasing my work, services, and how to get in touch.",
        },
      ],
    },
    {
      id: "stack",
      name: "Stack.md",
      type: "file",
      kind: "Markdown Document",
      modified: "Apr 15, 2026",
      preview:
        "Next.js · React · TypeScript · Tailwind CSS\nSupabase · Vercel · Figma\n\nBuilt for speed, reliability, and a great developer experience. I ship on Vercel and design in Figma.",
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findNode(node: TreeNode, id: string): TreeNode | null {
  if (node.id === id) return node;
  if (node.type === "folder") {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
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
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <path d="M3 2H10L13 5V14H3V2Z" fill="#fff" stroke="#C0C0C0" strokeWidth="0.8" />
      <path d="M10 2V5H13" fill="none" stroke="#C0C0C0" strokeWidth="0.8" />
      <line x1="5" y1="7.5" x2="11" y2="7.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="9.5" x2="11" y2="9.5" stroke="#C0C0C0" strokeWidth="0.7" />
      <line x1="5" y1="11.5" x2="9" y2="11.5" stroke="#C0C0C0" strokeWidth="0.7" />
    </svg>
  );
}

// ─── Tree Item ────────────────────────────────────────────────────────────────

type TreeItemProps = {
  node: TreeNode;
  depth: number;
  selected: string;
  openFolders: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
};

function TreeItem({ node, depth, selected, openFolders, onSelect, onToggle }: TreeItemProps) {
  const isFolder = node.type === "folder";
  const isOpen = isFolder && openFolders.has(node.id);
  const isSelected = selected === node.id;

  return (
    <div>
      <div
        className={[
          "flex items-center gap-1 py-[3px] pr-2 rounded cursor-pointer select-none",
          isSelected
            ? "bg-[#0064D2] text-white"
            : "text-[#1d1d1f] hover:bg-black/[0.06]",
        ].join(" ")}
        style={{ paddingLeft: `${6 + depth * 14}px` }}
        onClick={() => {
          onSelect(node.id);
          if (isFolder) onToggle(node.id);
        }}
      >
        {/* Chevron slot */}
        <span className="w-3 h-3 flex-none flex items-center justify-center">
          {isFolder &&
            (isOpen ? (
              <ChevronDown size={9} className={isSelected ? "text-white" : "text-[#86868b]"} />
            ) : (
              <ChevronRight size={9} className={isSelected ? "text-white" : "text-[#86868b]"} />
            ))}
        </span>

        {/* Icon */}
        {isFolder ? (
          <FolderIcon className="w-4 h-4 flex-none" />
        ) : (
          <FileIcon className="w-4 h-4 flex-none" />
        )}

        {/* Label */}
        <span className="ml-1 text-[12px] truncate leading-none">{node.name}</span>
      </div>

      {/* Recursive children */}
      {isFolder && isOpen &&
        node.children.map((child) => (
          <TreeItem
            key={child.id}
            node={child}
            depth={depth + 1}
            selected={selected}
            openFolders={openFolders}
            onSelect={onSelect}
            onToggle={onToggle}
          />
        ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FinderWindow() {
  const [selected, setSelected] = useState<string>("root");
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["root"]));

  const toggleFolder = useCallback((id: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelected(id);
  }, []);

  const selectedNode = findNode(ROOT, selected);
  const rightItems: TreeNode[] =
    selectedNode?.type === "folder" ? selectedNode.children : [];
  const selectedFile: FileNode | null =
    selectedNode?.type === "file" ? selectedNode : null;

  const itemCount =
    selectedNode?.type === "folder" ? selectedNode.children.length : null;

  return (
    <div
      className="w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col border border-black/[0.12]"
      style={{
        minHeight: 480,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
      }}
    >
      {/* Title bar */}
      <div className="flex items-center px-4 py-2.5 bg-[#EBEBEB] border-b border-[#CFCFCF] flex-none">
        <div className="flex gap-1.5 flex-none">
          <div className="w-[13px] h-[13px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <div className="w-[13px] h-[13px] rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-[13px] h-[13px] rounded-full bg-[#28C840] border border-[#1FAD2F]" />
        </div>
        <span className="flex-1 text-center text-[12px] font-semibold text-[#3d3d3d] select-none">
          nikolas.sapa
        </span>
        {/* Balance spacer */}
        <div className="w-[49px] flex-none" />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tree panel */}
        <div className="w-52 flex-none border-r border-[#DCDCDC] bg-[#F6F6F6] overflow-y-auto py-1.5 px-1">
          <TreeItem
            node={ROOT}
            depth={0}
            selected={selected}
            openFolders={openFolders}
            onSelect={handleSelect}
            onToggle={toggleFolder}
          />
        </div>

        {/* Content panel */}
        <div className="flex-1 bg-white overflow-y-auto">
          {selectedFile ? (
            // ── File preview ──
            <div className="p-6">
              <div className="flex items-start gap-3 mb-5 pb-4 border-b border-[#EBEBEB]">
                <FileIcon className="w-9 h-9 flex-none mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#1d1d1f] truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-[#86868b] mt-0.5">
                    {selectedFile.kind} · {selectedFile.modified}
                  </p>
                </div>
                {selectedFile.url && (
                  <a
                    href={selectedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-[#0064D2] hover:underline flex-none"
                  >
                    Open <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <pre className="text-[12px] text-[#3d3d3d] leading-[1.6] whitespace-pre-wrap font-sans">
                {selectedFile.preview}
              </pre>
            </div>
          ) : (
            // ── Folder list view ──
            <div>
              {/* Column headers */}
              <div className="flex items-center gap-4 px-4 py-1.5 border-b border-[#E5E5E5] bg-[#FAFAFA] sticky top-0">
                <span className="flex-1 text-[11px] font-medium text-[#86868b] select-none">
                  Name
                </span>
                <span className="w-32 text-[11px] font-medium text-[#86868b] select-none">
                  Date Modified
                </span>
                <span className="w-32 text-[11px] font-medium text-[#86868b] select-none">
                  Kind
                </span>
              </div>

              {rightItems.length === 0 ? (
                <p className="p-6 text-[12px] text-[#86868b]">Empty folder</p>
              ) : (
                rightItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 px-4 py-[5px] hover:bg-[#F0F0F0] cursor-pointer border-b border-[#F0F0F0] last:border-0"
                    onClick={() => {
                      handleSelect(item.id);
                      if (item.type === "folder") toggleFolder(item.id);
                    }}
                  >
                    <div className="flex-1 flex items-center gap-2 min-w-0">
                      {item.type === "folder" ? (
                        <FolderIcon className="w-4 h-4 flex-none" />
                      ) : (
                        <FileIcon className="w-4 h-4 flex-none" />
                      )}
                      <span className="text-[12px] text-[#1d1d1f] truncate">
                        {item.name}
                      </span>
                      {item.type === "file" && item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#0064D2] hover:opacity-70 flex-none"
                        >
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                    <span className="w-32 text-[11px] text-[#86868b] flex-none">
                      {item.modified}
                    </span>
                    <span className="w-32 text-[11px] text-[#86868b] flex-none">
                      {item.type === "folder" ? "Folder" : item.kind}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-1 bg-[#EBEBEB] border-t border-[#CFCFCF] flex-none">
        <span className="text-[11px] text-[#86868b]">
          {itemCount !== null
            ? `${itemCount} item${itemCount !== 1 ? "s" : ""}`
            : selectedFile?.name ?? ""}
        </span>
      </div>
    </div>
  );
}
