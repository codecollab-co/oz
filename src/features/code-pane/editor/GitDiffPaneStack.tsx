import type {
  GitCommitFileDiffTab,
  GitDiffTab,
  Tab,
} from "@/features/workspace-core/tabs";
import { GitDiffPaneDetail } from "./GitDiffPaneDetail";

type Props = {
  tabs: Tab[];
  activeId: number;
};

export function GitDiffPaneStack({ tabs, activeId }: Props) {
  const active = tabs.find(
    (t): t is GitDiffTab | GitCommitFileDiffTab =>
      (t.kind === "git-diff" || t.kind === "git-commit-file") &&
      t.id === activeId,
  );
  if (!active) return null;
  if (active.kind === "git-diff") {
    return (
      <div className="h-full w-full">
        <GitDiffPaneDetail
          key={active.id}
          active
          source={{
            kind: "working",
            repoRoot: active.repoRoot,
            path: active.path,
            mode: active.mode,
            originalPath: active.originalPath,
          }}
        />
      </div>
    );
  }
  return (
    <div className="h-full w-full">
      <GitDiffPaneDetail
        key={active.id}
        active
        source={{
          kind: "commit",
          repoRoot: active.repoRoot,
          sha: active.sha,
          path: active.path,
          originalPath: active.originalPath,
        }}
        chipLabel={active.shortSha}
      />
    </div>
  );
}
