import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { CopyCode } from "./copy-code";

type Props = {
  source: string;
  title: string;
  date?: string;
  status?: string;
  url?: string;
  children?: ReactNode;
};

export function MdxContent({ source, title, date, status, url, children }: Props) {
  return (
    <article
      className="p-8 md:p-12"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
      }}
    >
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#EBEBEB]">
        <div className="flex items-center gap-3 mb-2">
          {date && (
            <span className="text-[11px] uppercase tracking-wider text-[#86868b]">
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {status && (
            <span
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
              style={
                status === "active"
                  ? { background: "#f0fdf4", borderColor: "#bbf7d0", color: "#15803d" }
                  : status === "building"
                  ? { background: "#fffbeb", borderColor: "#fde68a", color: "#b45309" }
                  : status === "shipped"
                  ? { background: "#eff6ff", borderColor: "#bfdbfe", color: "#1d4ed8" }
                  : { background: "transparent", borderColor: "#DCDCDC", color: "#86868b" }
              }
            >
              {status}
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h1 className="text-[22px] font-semibold text-[#1d1d1f] leading-tight">
            {title}
          </h1>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded border border-[#DCDCDC] text-[#1d1d1f] hover:border-[#1d1d1f] transition-colors"
            >
              View live ↗
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="prose prose-stone max-w-none text-[14px] text-[#1d1d1f]">
        <MDXRemote
          source={source}
          components={{ pre: CopyCode }}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
        />
      </div>

      {children}
    </article>
  );
}
