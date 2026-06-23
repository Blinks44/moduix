---
name: upstream-library-docs
description: Use when component work needs current Ark UI, Chakra UI, or shadcn reference material from online sources.
---

# Skill: upstream-library-docs

Use this skill when component work needs upstream Ark UI, Chakra UI, or shadcn references.

moduix is already an Ark-backed library. Use upstream docs to verify current primitive behavior
and keep local contracts aligned with the versions in use.

## Sources

- Ark UI routing index: `https://ark-ui.com/llms.txt`
- Ark UI component docs: `https://ark-ui.com/docs/components/<component-slug>`
- Ark UI mdx component docs: `https://ark-ui.com/docs/components/<component-slug>.mdx`
- Ark UI ref guide: `https://ark-ui.com/docs/guides/ref`
- Ark UI forms guide: `https://ark-ui.com/docs/guides/forms`
- Ark UI animation guide: `https://ark-ui.com/docs/guides/animation`
- Ark UI component state guide: `https://ark-ui.com/docs/guides/component-state`
- Ark UI composition guide: `https://ark-ui.com/docs/guides/composition`
- Ark UI styling guide: `https://ark-ui.com/docs/guides/styling`
- Chakra UI component docs: `https://chakra-ui.com/docs/components/<component-slug>`
- Chakra UI mdx component docs: `https://chakra-ui.com/docs/components/<component-slug>.mdx`
- shadcn agent index: `https://ui.shadcn.com/llms.txt`

## Rules

- Read upstream sources online when current primitive or shadcn behavior matters.
- Use Ark UI for primitive behavior, accessibility, state, lifecycle, part naming, and low-level API.
- Use Chakra UI for the higher-level Ark-aligned composition model, overlay ergonomics, and recipe-level defaults.
- Use shadcn for docs ergonomics, example flow, and narrow convenience patterns, not as the source of truth for hidden structural composition.
- Do not rely on local snapshots.
- If an upstream source is unavailable, stop and report it instead of guessing.

## Local vs Upstream

Upstream sources explain the primitive or external pattern. Local component markdown is the source
of truth for `moduix` wrapper behavior that this repo intentionally adds, removes, renames, styles,
or constrains.

Apply repository contract rules from `AGENTS.md`, `.agents/skills/ui-component-workflow/SKILL.md`,
`.agents/skills/local-component-docs/SKILL.md`, or `.agents/skills/docs-workflow/SKILL.md` according
to the files being changed.