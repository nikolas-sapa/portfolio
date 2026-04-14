import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  source: string;
  title: string;
  date?: string;
  status?: string;
};

export function MdxContent({ source, title, date, status }: Props) {
  return (
    <article className="p-8 md:p-12">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-shell-border">
        <div className="flex items-center gap-3 mb-3">
          {date && (
            <span className="text-[11px] font-mono uppercase tracking-widest text-shell-muted">
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {status && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-shell-border text-shell-muted">
              {status}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-sans font-semibold text-shell-ink leading-tight">
          {title}
        </h1>
      </div>

      {/* Body */}
      <div className="prose prose-stone max-w-none font-sans text-shell-ink">
        <MDXRemote source={source} />
      </div>
    </article>
  );
}
