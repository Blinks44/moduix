---
name: rtk-command-proxy
description: Immutable baseline skill for this repo that must be applied immediately after engineering-principles whenever shell commands are used. It requires prefixing shell commands with `rtk` and documents the allowed verification and meta commands.
---

# RTK Command Proxy

Use this skill immediately after `engineering-principles` for coding and terminal work in this
repository.

This is an immutable baseline skill. Do not add unrelated project rules to it and do not change it
unless the RTK workflow itself changes.

## Rule

Always prefix shell commands with `rtk`.

Examples:

```bash
rtk git status
rtk cargo test
rtk npm run build
rtk pytest -q
```

## Meta Commands

```bash
rtk gain
rtk gain --history
rtk proxy <cmd>
```

Use `rtk proxy <cmd>` only when you intentionally need the raw command path.

## Verification

```bash
rtk --version
rtk gain
which rtk
```