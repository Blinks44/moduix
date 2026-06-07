---
name: local-component-docs
description: Use when creating or updating component-local markdown in packages/ui/src/components, including wrapper contracts and concise changelog entries.
---

# Skill: local-component-docs

Use this skill for markdown files in `packages/ui/src/components`.

## Scope

- `packages/ui/src/components/<component-name>/<component-name>.md`
- wrapper behavior contracts
- component-specific agent notes
- component-level changelog entries

## Rules

- Local markdown documents the `moduix` wrapper, not the upstream Base UI primitive.
- Use Base UI markdown only to understand primitive behavior, accessibility, state, and lifecycle.
- Do not copy upstream docs locally.
- Keep the file explicit enough that future agents can preserve intentional behavior unless the user asks to change it.

Document:

- exposed abstraction over the primitive
- public composition model and exported parts
- defaults, DX sugar, and styling hooks
- intentional differences from Base UI
- constraints or edge cases that affect implementation
- agent notes worth preserving

## Recommended Structure

For new or heavily rewritten files, prefer:

```md
# ComponentName

Upstream primitive docs: https://base-ui.com/react/components/<primitive-slug>.md

## Purpose

## Current behavior contract

## Composition

## Defaults and styling

## Intentional differences from Base UI

## Agent notes

## Local changelog
```

Existing headings can stay when the same information remains clear.

- Keep a short changelog in the component markdown file.
- Record meaningful API, behavior, composition, styling-contract, and recommended-usage changes.
- Skip formatting-only edits and noisy internal churn.
- If the change is also public at package level, update the package changelog when one exists.
- When a component changes, update its markdown in the same task if the API, default behavior, composition, styling hooks, CSS variables, recommended usage, or preservation notes changed.