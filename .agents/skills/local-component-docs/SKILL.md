---
name: local-component-docs
description: Use when creating or updating component-local markdown in packages/ui/src/components, including wrapper contracts and concise changelog entries.
---

# Skill: local-component-docs

Use this skill for markdown files in `packages/ui/src/components`.

## Scope

- `packages/ui/src/components/<component-name>/<component-name>.md`
- wrapper behavior contracts
- component-specific preservation notes
- component-level changelog entries

## Rules

- Local markdown documents the `moduix` wrapper, not the upstream Ark UI primitive or Chakra recipe.
- Use Ark and Chakra docs only to understand primitive behavior, composition, accessibility, state, and lifecycle.
- Do not copy upstream docs locally.
- Keep the file explicit enough that future agents can preserve intentional behavior unless the user asks to change it.

Document:

- public composition model and exported parts
- defaults, DX sugar, and styling hooks
- intentional differences from upstream Ark/Chakra
- constraints or edge cases that affect implementation
- agent notes worth preserving

## Recommended Structure

For new or heavily rewritten files, prefer:

```md
# ComponentName

Upstream primitive docs:

- Ark UI: https://ark-ui.com/docs/components/<component-slug>
- Chakra UI: https://chakra-ui.com/docs/components/<component-slug>

## Purpose

## Current behavior contract

## Composition

## Defaults and styling

## Intentional differences from upstream

## Agent notes

## Local changelog
```

Existing headings can stay when the same information remains clear.

## Changelog

- Keep a short changelog in the component markdown file.
- Record meaningful API, behavior, composition, styling-contract, and recommended-usage changes.
- Skip formatting-only edits and noisy internal churn.
- If the change is also public at package level, update the package changelog when one exists.
- When a component changes, update its markdown in the same task if the API, default behavior, composition, styling hooks, CSS variables, recommended usage, or preservation notes changed.