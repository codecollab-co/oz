import "../styles/globals.css";

import { getCurrentWindow } from "@tauri-apps/api/window";
import ReactDOM from "react-dom/client";
import { ChromeThemeProvider } from "@/features/layout-chrome/theme";
import { USE_CUSTOM_WINDOW_CONTROLS } from "@/lib/platform";
import { ChromeSettingsApp } from "./ChromeSettingsApp";

if (USE_CUSTOM_WINDOW_CONTROLS) {
  document.documentElement.dataset.chrome = "borderless";
}

ReactDOM.createRoot(
  document.getElementById("settings-root") as HTMLElement,
).render(
  <ChromeThemeProvider>
    <ChromeSettingsApp />
  </ChromeThemeProvider>,
);

const showWindow = () => {
  getCurrentWindow()
    .show()
    .catch((e) => console.error("settings show failed:", e));
};
setTimeout(showWindow, 50);
setTimeout(showWindow, 500);
