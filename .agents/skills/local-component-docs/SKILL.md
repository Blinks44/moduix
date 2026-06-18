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
- The local markdown must follow one mandatory section order so component docs stay structurally consistent.
- The local markdown must mirror the upstream Ark UI mental model first, then layer moduix sugar on top.
- If Ark UI has a dedicated component page, cover all relevant upstream sections the wrapper exposes:
  anatomy, examples, guides, API parts, state, and styling hooks.
- If Ark UI does not have a dedicated component page, say that explicitly and cite the Ark guide or factory
  source plus any Chakra recipe used as the upstream mental model.
- Do not invent local abstractions that hide or rename upstream concepts without documenting the difference explicitly.

Document:

- public composition model and exported parts
- defaults, DX sugar, and styling hooks
- intentional differences from upstream Ark/Chakra
- constraints or edge cases that affect implementation
- agent notes worth preserving

## Required Structure

Every `packages/ui/src/components/<component-name>/<component-name>.md` file must use this section order:

```md
# ComponentName

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/<component-slug>
- Chakra UI: https://chakra-ui.com/docs/components/<component-slug>

## Purpose

## Upstream model to preserve

## Current behavior contract

## Anatomy and exported parts

## Composition

## Upstream feature coverage

## Accessibility and state

## Defaults and styling

## Intentional sugar and differences from upstream

## Agent notes

## Local changelog
```

Use the same headings and order even when a component is simple. Keep sections short when the surface area is small,
but do not omit them.

### Section requirements

- `Upstream docs`
  - Always link Ark UI.
  - Link Chakra UI when Chakra materially informs the wrapper contract.
  - If no dedicated Ark component exists, write that plainly and link the exact Ark guide/factory reference instead.
- `Purpose`
  - One short description of what the component is for.
- `Upstream model to preserve`
  - State the upstream primitive, guide, or composition model the wrapper follows.
  - Call out the parts, provider/context model, and high-level behaviors that must stay Ark-shaped.
- `Current behavior contract`
  - Summarize the shipped public API, defaults, custom sugar, and constraints.
- `Anatomy and exported parts`
  - Show the structural part tree in text or code.
  - List exported parts with their stable `data-slot` hooks and notable default behavior.
- `Composition`
  - Include at least one canonical usage example that matches the shipped API.
  - Prefer an example that reflects the primary Ark composition path.
- `Upstream feature coverage`
  - Map the relevant Ark docs sections to moduix behavior.
  - Cover the upstream examples and guides that the wrapper supports, such as controlled usage,
    provider/context patterns, lazy mount, vertical mode, autoplay, and similar component-specific flows.
  - If a relevant upstream topic is intentionally unsupported or changed, say so explicitly.
- `Accessibility and state`
  - Document preserved Ark callback shapes, ARIA behavior, data attributes, CSS variables, and state hooks.
- `Defaults and styling`
  - Document `className` support, theme tokens, CSS variables, and styling hooks added by moduix.
- `Intentional sugar and differences from upstream`
  - Separate moduix styling defaults and DX additions from upstream Ark behavior.
  - Document all renamed, removed, or added wrapper behaviors here.
- `Agent notes`
  - Keep only preservation notes that matter for future implementation work.
- `Local changelog`
  - Keep a short dated changelog at the end of the file.

## Changelog

- Keep a short changelog in the component markdown file.
- Record meaningful API, behavior, composition, styling-contract, and recommended-usage changes.
- Skip formatting-only edits and noisy internal churn.
- If the change is also public at package level, update the package changelog when one exists.
- When a component changes, update its markdown in the same task if the API, default behavior, composition, styling hooks, CSS variables, recommended usage, or preservation notes changed.