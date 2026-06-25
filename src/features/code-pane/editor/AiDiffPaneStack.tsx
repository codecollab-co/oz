import type { AiDiffTab, Tab } from "@/features/workspace-core/tabs";
import { AiDiffPaneDetail } from "./AiDiffPaneDetail";

type Props = {
  tabs: Tab[];
  activeId: number;
  onAccept: (approvalId: string) => void;
  onReject: (approvalId: string) => void;
};

export function AiDiffPaneStack({ tabs, activeId, onAccept, onReject }: Props) {
  const active = tabs.find(
    (t): t is AiDiffTab => t.kind === "ai-diff" && t.id === activeId,
  );
  if (!active) return null;
  return (
    <div className="h-full w-full">
      <AiDiffPaneDetail
        key={active.id}
        path={active.path}
        originalContent={active.originalContent}
        proposedContent={active.proposedContent}
        status={active.status}
        isNewFile={active.isNewFile}
        onAccept={() => onAccept(active.approvalId)}
        onReject={() => onReject(active.approvalId)}
      />
    </div>
  );
}
