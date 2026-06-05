---
name: upstream-library-docs
description: Use when component work needs current Base UI or shadcn reference material from online sources.
---

# Skill: upstream-library-docs

Use this skill when component work needs upstream Base UI or shadcn references.

## Sources

- Base UI agent index: `https://base-ui.com/llms.txt`
- Base UI component markdown: `https://base-ui.com/react/components/<primitive-slug>.md`
- shadcn agent index: `https://ui.shadcn.com/llms.txt`

## Rules

- Read upstream sources online when current primitive or shadcn behavior matters.
- Use Base UI for primitive behavior, accessibility, state, lifecycle, and low-level API.
- Use shadcn for composition style, wrapper ergonomics, and docs tone.
- Do not rely on local snapshots.
- If an upstream source is unavailable, stop and report it instead of guessing.

## Local vs Upstream

Upstream sources explain the primitive or external pattern. Local component markdown is the source of truth for `moduix` wrapper behavior that this repo intentionally adds, removes, renames, styles, or constrains.