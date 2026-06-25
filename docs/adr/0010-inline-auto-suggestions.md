# Local History-Based Inline Terminal Auto-Suggestions

We decided to implement inline terminal auto-suggestions inside the shell editor input buffer using ghost-text rendering (via CodeMirror extensions) backed by a local, Rust-managed terminal command history database. Querying cloud LLM APIs on every keystroke introduces prohibitive network latency, high token costs, and privacy concerns. Using a local command history buffer first (with optional, explicit local offline LLM completions) ensures instantaneous, zero-cost, and private command suggestions.
