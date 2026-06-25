# File-Based Customization and Theme Storage

We decided to persist all theme customization, keybindings, and layout profiles to local JSON configuration files in the user's application data directory (using `tauri-plugin-store`) rather than the webview's LocalStorage. This ensures configurations are resilient to browser cache purges, enables power users to edit configuration files directly using external editors, and allows the Rust backend to read window layouts and fonts at startup before compiling the webview, preventing UI flicker.
