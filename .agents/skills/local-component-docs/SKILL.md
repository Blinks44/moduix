---
name: local-component-docs
description: Use when creating or updating component-local markdown in packages/react/src/components, including wrapper contracts and concise changelog entries.
---

# Skill: local-component-docs

Use this skill for markdown files in `packages/react/src/components`.

## Scope

- `packages/react/src/components/<component-name>/<component-name>.md`
- wrapper behavior contracts
- component-specific preservation notes
- component-level changelog entries

## Rules

- Local markdown documents the `moduix` wrapper, not the upstream Ark UI primitive or Chakra recipe.
- Use Ark and Chakra docs only to understand primitive behavior, composition, accessibility, state, and lifecycle.
- Do not copy upstream docs locally.
- Keep the file explicit enough that future agents can preserve intentional behavior unless the user asks to change it.
- The local markdown must mirror the upstream Ark UI mental model first, then layer moduix sugar on top.
- If Ark UI has a dedicated component page, cover the upstream concepts the wrapper still exposes.
- If Ark UI does not have a dedicated component page, say that explicitly and cite the Ark guide or factory
  source plus any Chakra recipe used as the upstream mental model.
- For components with no Ark primitive, document the component as a moduix-owned contract: semantic element or role,
  exported parts, accessibility expectations, styling hooks, and intentional differences. Do not invent Ark parts,
  callback shapes, provider/context hooks, or example coverage that upstream does not provide.
- Do not invent local abstractions that hide or rename upstream concepts without documenting the difference explicitly.

Document:

- public composition model and exported parts
- defaults, DX sugar, and styling hooks
- intentional differences from upstream Ark/Chakra
- constraints or edge cases that affect implementation
- agent notes worth preserving

## Coverage Checklist

When the wrapper exposes the relevant behavior, document these Ark guide concepts explicitly:

- `ref` behavior for the root, trigger, input, or control parts that consumers or form libraries should target.
- `Field.Root` / `Fieldset.Root` context integration for `disabled`, `invalid`, `required`, and `readOnly`.
- Native form-control ownership for submission and reset synchronization: state whether the consumer composes the
  Ark hidden part or moduix renders it automatically. For automatic controls, document their placement, `name`/
  `form` behavior, and any semantic replacement props; do not list removed hidden parts as public anatomy.
- `asChild` and `ark` factory composition paths, including the single-child and semantic-element constraints.
- `ids` usage when the component composes with another Ark component and shared accessibility IDs are required.
- `Component.Context`, `use*Context`, and `RootProvider` support when the wrapper exposes those Ark state patterns.
- If upstream exposes those provider/context/hook patterns, also document whether they are exported from the package
  barrel and available to consumers importing from `moduix`.
- If public docs or examples rely on an upstream context, item context, state hook, or context hook for normal advanced
  usage, document the moduix-owned export path and avoid presenting `ArkComponent.Context` imports as the primary
  consumer API. Direct Ark imports are acceptable only for rare escape hatches intentionally left outside the wrapper.
- `present`, lazy mounting, and CSS exit-animation behavior when the component mounts and unmounts content.
- `data-scope`, `data-part`, `data-state`, other Ark state attributes, Ark CSS variables, and moduix `data-slot`
  hooks that consumers can target.

## Required Structure

Every `packages/react/src/components/<component-name>/<component-name>.md` file must use this section order:

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

### Section expectations

- `Upstream docs`
  - Always link Ark UI.
  - Link Chakra UI when Chakra materially informs the wrapper contract.
  - If no dedicated Ark component exists, write that plainly and link the exact Ark guide/factory reference instead.
- `Purpose`: one short description of what the component is for.
- `Upstream model to preserve`: name the primitive, guide, or composition model and the Ark-shaped behaviors that must stay intact.
- `Current behavior contract`: summarize the shipped API, defaults, sugar, and constraints.
- `Anatomy and exported parts`: show the part tree and note stable `data-slot` hooks or notable defaults.
- `Composition`: include at least one canonical usage example that matches the shipped API.
- `Upstream feature coverage`: map the relevant upstream concepts to moduix behavior and call out intentional gaps.
- `Accessibility and state`: capture refs, callback shapes, form context, `HiddenInput`, state hooks, data attributes, and CSS variables when exposed.
- `Defaults and styling`: document theme tokens, Ark CSS variables, animation/state hooks, and styling hooks.
- `Intentional sugar and differences from upstream`: isolate everything moduix adds, renames, removes, or constrains.
- For each convenience part, explain the boilerplate it removes, the lower-level composition it preserves, and the
  available styling path (`className`, data attributes, CSS variables, `data-slot`, or exported parts).
- `Agent notes`: keep only preservation notes that matter for future implementation work.
- When moduix internalizes an Ark native control, record the preserved form behavior and the intentional API difference
  from Ark in `Current behavior contract`, `Composition`, and `Intentional sugar and differences from upstream`.
- `Local changelog`: keep a short dated changelog at the end of the file.

## Changelog

- Keep a short changelog in the component markdown file.
- Record meaningful API, behavior, composition, styling-contract, and recommended-usage changes.
- Skip formatting-only edits and noisy internal churn.
- When a component changes, update its markdown in the same task if the API, default behavior, composition, styling hooks, CSS variables, recommended usage, or preservation notes changed.