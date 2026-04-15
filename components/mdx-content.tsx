import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  source: string;
  title: string;
  date?: string;
  status?: string;
};

export function MdxContent({ source, title, date, status }: Props) {
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
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#DCDCDC] text-[#86868b]">
              {status}
            </span>
          )}
        </div>
        <h1 className="text-[22px] font-semibold text-[#1d1d1f] leading-tight">
          {title}
        </h1>
      </div>

      {/* Body */}
      <div className="prose prose-stone max-w-none text-[14px] text-[#1d1d1f]">
        <MDXRemote source={source} />
      </div>
    </article>
  );
}
