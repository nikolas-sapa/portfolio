import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentItem = {
  slug: string;
  title: string;
  date: string;        // ISO string e.g. "2026-04-14"
  description: string; // short blurb for sidebar preview
  status?: string;     // projects only: "active" | "shipped" | "paused"
  tags?: string[];
  content: string;     // raw MDX source
};

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getItems(section: string): ContentItem[] {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        status: data.status,
        tags: data.tags ?? [],
        content,
      } satisfies ContentItem;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getItem(section: string, slug: string): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    status: data.status,
    tags: data.tags ?? [],
    content,
  };
}
