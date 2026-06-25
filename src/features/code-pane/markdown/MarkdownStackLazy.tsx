import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";
import type { MarkdownPaneStack as MarkdownStackType } from "./MarkdownPaneStack";

const MarkdownStackInner = lazy(() =>
  import("./MarkdownPaneStack").then((m) => ({ default: m.MarkdownPaneStack })),
);

type Props = ComponentProps<typeof MarkdownStackType>;

export function MarkdownPaneStack(props: Props) {
  return (
    <Suspense fallback={null}>
      <MarkdownStackInner {...props} />
    </Suspense>
  );
}
