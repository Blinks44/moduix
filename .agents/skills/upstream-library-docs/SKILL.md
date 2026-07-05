---
name: upstream-library-docs
description: Use when component work needs current Ark UI, Chakra UI, or shadcn reference material from online sources.
---

# Skill: upstream-library-docs

Use this skill when component work needs upstream Ark UI, Chakra UI, or shadcn references.

moduix is already an Ark-backed library. Use upstream docs to verify current primitive behavior
and keep local contracts aligned with the versions in use.

## Sources

- Ark UI index: `https://ark-ui.com/llms.txt`
- Ark UI component docs: `https://ark-ui.com/docs/components/<component-slug>` and `.mdx`
- Ark UI guides: `ref`, `forms`, `animation`, `component-state`, `composition`, `styling`
- Chakra UI component docs: `https://chakra-ui.com/docs/components/<component-slug>` and `.mdx`
- shadcn index: `https://ui.shadcn.com/llms.txt`

## Rules

- Read upstream sources online when current primitive or shadcn behavior matters.
- Prefer the exact component page or guide over top-level docs.
- Use Ark UI for primitive behavior, accessibility, state, lifecycle, part naming, and low-level API.
- Use Chakra UI for the higher-level Ark-aligned composition model, overlay ergonomics, and recipe-level defaults.
- Use shadcn for docs ergonomics, example flow, and narrow convenience patterns, not as the source of truth for hidden structural composition.
- Do not rely on local snapshots.
- If an upstream source is unavailable, stop and report it instead of guessing.

## Local vs Upstream

Upstream sources explain the primitive or external pattern. Local component markdown and docs explain
intentional `moduix` wrapper behavior: anything added, removed, renamed, styled, or constrained
locally belongs there, not in upstream assumptions.