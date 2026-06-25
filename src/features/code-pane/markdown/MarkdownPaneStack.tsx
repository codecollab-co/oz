import { cn } from "@/lib/utils";
import type { MarkdownTab, Tab } from "@/features/workspace-core/tabs";
import { MarkdownPreviewPane } from "./MarkdownPreviewPane";

type Props = {
  tabs: Tab[];
  activeId: number;
  onSetMarkdownView: (id: number, mode: "rendered" | "raw") => void;
};

export function MarkdownPaneStack({ tabs, activeId, onSetMarkdownView }: Props) {
  const markdowns = tabs.filter(
    (t): t is MarkdownTab => t.kind === "markdown" && !t.cold,
  );
  if (markdowns.length === 0) return null;
  return (
    <div className="relative h-full w-full">
      {markdowns.map((t) => {
        const visible = t.id === activeId;
        return (
          <div
            key={t.id}
            className={cn(
              "absolute inset-0",
              !visible && "invisible pointer-events-none",
            )}
            aria-hidden={!visible}
          >
            <MarkdownPreviewPane
              path={t.path}
              visible={visible}
              onSetView={(mode) => onSetMarkdownView(t.id, mode)}
            />
          </div>
        );
      })}
    </div>
  );
}
