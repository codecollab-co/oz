# Secure Key Storage via OS Keyring

We decided to store all user-configured API keys securely using the host operating system's native credential store (macOS Keychain, Windows Credential Manager, Linux Secret Service) rather than persisting them in plaintext config files or the webview's LocalStorage. This provides encrypted security at rest, accessible only via secure Tauri IPC command endpoints.
