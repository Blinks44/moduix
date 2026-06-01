# Skill: upstream-library-docs

Use this skill when component work needs upstream Base UI or shadcn reference material.

## Sources

- Base UI agent index: `https://base-ui.com/llms.txt`
- Base UI component markdown: `https://base-ui.com/react/components/<primitive-slug>.md`
- shadcn agent index: `https://ui.shadcn.com/llms.txt`

Examples:

- `https://base-ui.com/react/components/accordion.md`
- `https://base-ui.com/react/components/alert-dialog.md`

## Rules

- Read upstream sources online when current primitive or shadcn behavior matters.
- Use Base UI sources for primitive behavior, accessibility, state, lifecycle, and low-level API.
- Use shadcn sources for composition style, wrapper ergonomics, and documentation tone.
- Do not rely on local snapshots for Base UI or shadcn reference content.
- If a required upstream source cannot be accessed, stop and report it instead of guessing.

## Local vs Upstream

Upstream sources explain the primitive or external pattern. Local component markdown explains the
current `moduix` wrapper contract and is the source of truth for behavior that this repository has
intentionally added, simplified, renamed, styled, or constrained.