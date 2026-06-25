import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";
import type { GitDiffPaneStack as GitDiffStackType } from "./GitDiffPaneStack";

const GitDiffStackInner = lazy(() =>
  import("./GitDiffPaneStack").then((m) => ({ default: m.GitDiffPaneStack })),
);

type Props = ComponentProps<typeof GitDiffStackType>;

export function GitDiffPaneStack(props: Props) {
  return (
    <Suspense fallback={null}>
      <GitDiffStackInner {...props} />
    </Suspense>
  );
}
