# Dual-Pane Workspace and Supervised Tool Execution

We decided to structure the user interface as a dual-pane layout containing an interactive terminal alongside a collapsible AI Sidebar. To enable powerful DevOps and file-level debugging capabilities (such as inspecting system logs or querying running containers), the AI assistant is equipped with backend tools to read files and execute shell commands, but all execution of state-mutating or external command operations must be explicitly approved by the user via graphical confirmation cards (Supervised Tool Execution).
