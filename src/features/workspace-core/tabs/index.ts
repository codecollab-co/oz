export { WorkspaceTabBar, TabIcon } from "./WorkspaceTabBar";
export { WorkspaceTabSwitcherHud } from "./WorkspaceTabSwitcherHud";
export {
  useTabSwitcher,
  type TabSwitcherState,
} from "./lib/useTabSwitcher";
export { labelFor } from "./lib/tabLabel";
export {
  MAX_PANES_PER_TAB,
  DEFAULT_SPACE_ID,
  useWorkspaceTabs,
  nextActiveInSpace,
  type Tab,
  type TerminalTab,
  type EditorTab,
  type PreviewTab,
  type MarkdownTab,
  type AiDiffTab,
  type GitDiffTab,
  type GitHistoryTab,
  type GitCommitFileDiffTab,
  type AiDiffStatus,
  type TabPatch,
} from "./lib/useWorkspaceTabs";
export { useWorkspaceCwd } from "./lib/useWorkspaceCwd";
export { useWindowTitle } from "./lib/useWindowTitle";
