import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";
import type { CodePaneStack as EditorStackType } from "./CodePaneStack";

const EditorStackInner = lazy(() =>
  import("./CodePaneStack").then((m) => ({ default: m.CodePaneStack })),
);

type Props = ComponentProps<typeof EditorStackType>;

export function CodePaneStack(props: Props) {
  return (
    <Suspense fallback={null}>
      <EditorStackInner {...props} />
    </Suspense>
  );
}
