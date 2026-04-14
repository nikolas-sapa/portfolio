import { redirect } from "next/navigation";
import { getItems } from "@/lib/content";

export default function WritingIndex() {
  const items = getItems("writing");
  if (items.length > 0) redirect(`/writing/${items[0].slug}`);

  return (
    <div className="p-12 text-sm font-mono text-shell-muted">
      No posts yet. Add an MDX file to content/writing/.
    </div>
  );
}
