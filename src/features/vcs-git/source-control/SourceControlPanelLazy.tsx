import { lazy, Suspense } from "react";
import type { ComponentProps } from "react";
import type { VcsGitControlPanel as SourceControlPanelType } from "./VcsGitControlPanel";

const SourceControlPanelInner = lazy(() =>
  import("./VcsGitControlPanel").then((m) => ({
    default: m.VcsGitControlPanel,
  })),
);

type Props = ComponentProps<typeof SourceControlPanelType>;

export function VcsGitControlPanel(props: Props) {
  return (
    <Suspense fallback={null}>
      <SourceControlPanelInner {...props} />
    </Suspense>
  );
}
