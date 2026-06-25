import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";
import type { AiDiffPaneStack as AiDiffStackType } from "./AiDiffPaneStack";

const AiDiffStackInner = lazy(() =>
  import("./AiDiffPaneStack").then((m) => ({ default: m.AiDiffPaneStack })),
);

type Props = ComponentProps<typeof AiDiffStackType>;

export function AiDiffPaneStack(props: Props) {
  return (
    <Suspense fallback={null}>
      <AiDiffStackInner {...props} />
    </Suspense>
  );
}
