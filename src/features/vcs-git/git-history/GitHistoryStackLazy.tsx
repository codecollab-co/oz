import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";
import type { VcsGitHistoryStack as GitHistoryStackType } from "./VcsGitHistoryStack";

const GitHistoryStackInner = lazy(() =>
  import("./VcsGitHistoryStack").then((m) => ({ default: m.VcsGitHistoryStack })),
);

type Props = ComponentProps<typeof GitHistoryStackType>;

export function VcsGitHistoryStack(props: Props) {
  return (
    <Suspense fallback={null}>
      <GitHistoryStackInner {...props} />
    </Suspense>
  );
}
