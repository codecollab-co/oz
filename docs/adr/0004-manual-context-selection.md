# Manual Context Selection for AI Prompts

We decided to use a manual context model for the AI Sidebar rather than automatically bridging the active terminal's scrollback logs and directories. The AI assistant only receives terminal outputs, code files, or folder trees that the user explicitly highlights, copies, or attaches to the chat composer. This prioritizes user privacy, gives developers explicit control over what data is sent to cloud LLM APIs, and reduces unnecessary token overhead.
