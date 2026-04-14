import { redirect } from "next/navigation";
import { getItems } from "@/lib/content";

export default function ResourcesIndex() {
  const items = getItems("resources");
  if (items.length > 0) redirect(`/resources/${items[0].slug}`);

  return (
    <div className="p-12 text-sm font-mono text-shell-muted">
      No resources yet. Add an MDX file to content/resources/.
    </div>
  );
}
