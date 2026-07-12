# @codecollab.co/oz

Oz is an open-source, lightweight, AI-native terminal emulator (ADE - agentic development environment). It integrates a GPU-accelerated WebGL terminal, code editor, file explorer, source control manager, and a first-class AI agent subsystem that runs against your own keys or local inference engines.

This package is a multi-platform CLI launcher for the desktop application. When run for the first time, it automatically fetches, extracts, and runs the precompiled desktop binary for your current operating system and architecture.

## Installation

Install globally via npm or pnpm:

```bash
npm install -g @codecollab.co/oz
# or
pnpm add -g @codecollab.co/oz
```

## Usage

Launch the Oz desktop application directly from your shell:

```bash
oz
```

Or run without global installation:

```bash
npx @codecollab.co/oz
```

Other commands:

```bash
oz install     # download + install into Applications / Start Menu, without launching
oz uninstall   # remove the installed app and cached binaries (~/.oz)
```

## Why install via this launcher?

Oz is not code-signed or notarized yet (test phase — no paid Apple/Windows
certificates). Installers downloaded through a **browser** are tagged by the OS
(macOS quarantine flag, Windows Mark-of-the-Web), so Gatekeeper reports
"Oz is damaged" and SmartScreen shows "Windows protected your PC".

This launcher fetches the release over plain HTTPS instead of a browser, so those
tags are never applied. It also:

- copies the app into `/Applications` (macOS), adds a Start Menu shortcut (Windows),
  or writes a `.desktop` entry (Linux) so Oz shows up like a normally installed app;
- strips `com.apple.quarantine` and repairs the ad-hoc signature on macOS defensively;
- launches Oz **detached**, so your terminal is freed immediately instead of being
  held open until you quit the app.

No Apple Developer account or signing secret is required.

## Documentation & Source Code

For the full codebase, roadmap, and build options, visit the GitHub repository:
[github.com/codecollab-co/oz](https://github.com/codecollab-co/oz)
