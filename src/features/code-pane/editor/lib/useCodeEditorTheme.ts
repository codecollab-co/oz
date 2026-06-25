import { usePreferencesStore } from "@/features/layout-chrome/settings/preferences";
import { resolveEditorThemeId, useTheme } from "@/features/layout-chrome/theme";
import type { Extension } from "@codemirror/state";
import { useMemo } from "react";
import { EDITOR_THEME_EXT } from "./themes";

/** Resolves the active CodeMirror theme extension, honoring the "auto" pairing. */
export function useCodeEditorTheme(): Extension {
  const pref = usePreferencesStore((s) => s.editorTheme);
  const { themeId, customThemes, resolvedMode } = useTheme();
  return useMemo(() => {
    const id = resolveEditorThemeId(pref, themeId, customThemes, resolvedMode);
    return EDITOR_THEME_EXT[id] ?? EDITOR_THEME_EXT.atomone;
  }, [pref, themeId, customThemes, resolvedMode]);
}
