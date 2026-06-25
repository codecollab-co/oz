import type { Tab, TerminalTab } from "@/features/workspace-core/tabs/lib/useWorkspaceTabs";

/**
 * Terminal tabs that PtyTerminalStack mounts. Cold tabs (restored, not yet
 * activated) are excluded so no PTY is spawned until first activation.
 */
export function selectLiveTerminals(tabs: Tab[]): TerminalTab[] {
  return tabs.filter((t): t is TerminalTab => t.kind === "terminal" && !t.cold);
}
