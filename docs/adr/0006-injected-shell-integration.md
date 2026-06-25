# Injected Shell Integration and OSC State Tracking

We decided to boot shell processes inside the PTY using injected startup integration profiles (in bash, zsh, and PowerShell) rather than raw, uninstrumented PTY streams. These profiles inject prompt-rendering hooks that emit invisible Operating System Command (OSC) escape sequences (specifically OSC 7 for working directories and OSC 133 for prompt boundaries and command exit codes). This allows the application to track active state changes and separate command input from output lines.
