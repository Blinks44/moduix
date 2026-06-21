---
name: ui-component-workflow
description: Use for work in packages/react, including component implementation, API changes, stories, exports, and local component docs.
---

# Skill: ui-component-workflow

Use this skill for work in `packages/react`.

## Scope

- new components
- component API, behavior, and style changes
- stories, public exports, and local component docs

## Read First

1. `AGENTS.md`
2. `packages/react/src/components/<component-name>/<component-name>.md`
3. `.agents/skills/js-react-conventions/SKILL.md`
4. `.agents/skills/upstream-library-docs/SKILL.md` when Ark, Chakra, or shadcn behavior matters
5. `.agents/skills/local-component-docs/SKILL.md` when component markdown changes
6. `.agents/skills/cross-package-sync/SKILL.md` when public changes affect docs
7. `references/component-family-contracts.md` for popup-like and dialog-like families

Before editing an existing component, inspect the TSX implementation, CSS module, stories, and local component markdown. Check public docs/examples when the change is user-facing.

## Goal

Build thin styled wrappers over Ark UI primitives and Ark-style contracts:

- minimal wrapper logic
- predictable composition
- small public API
- explicit structural composition
- convenience that does not obscure the upstream part tree

Small DX sugar is acceptable only when it removes repeated production boilerplate without hiding the real composition model.

## Ark-First Maintenance

- Treat Ark UI as the source of truth for component anatomy, naming, lifecycle, state, callback details, and accessibility.
- Use Chakra and shadcn only as secondary references for higher-level composition, recipes, and docs ergonomics.
- Keep wrappers thin. Do not add compatibility shims, prop translations, flat aliases, hidden structural bundles, or local state layers unless there is a documented product reason.
- When Ark exposes `RootProvider`, `Context`, `ItemContext`, `useComponent`, `use*Context`, or related types, mirror that public surface through the component and barrel unless intentionally documented otherwise.
- For components without a dedicated Ark primitive, use Ark factory/composition patterns or native DOM semantics, and document the component as a moduix-owned contract.
- Keep stories, local markdown, public docs, package barrels, and registry artifacts synchronized with the shipped API.

## Ark Contract Rules

- Use Ark React primitives from `@ark-ui/react/<component>` as the behavior source for Ark-backed components.
- Keep Ark parts, controlled/uncontrolled props, callback detail objects, and state shapes intact.
- For form controls, preserve Ark `HiddenInput` when native form submission or reset must work.
- Let `Field.Root` and `Fieldset.Root` provide `disabled`, `invalid`, `required`, and `readOnly` context instead of
  duplicating those states in wrapper code.
- Forward consumer refs to the actual Ark part that renders the intended DOM element. This matters for form-library
  invalid focus, imperative measurement, and trigger/control integration.
- Use `Component.Context` for one-off inline state reads, `use*Context` hooks for reusable child parts, and
  `useComponent` plus `RootProvider` only for state controlled outside the rendered tree.
- If the Ark namespace exports `RootProvider`, `Context`, `ItemContext`, hooks, or related public types, mirror that
  surface through the moduix component and its `index.ts` barrel unless there is a documented reason to hide it.
  Check docs examples against imports from `moduix`, not only local component imports.
- When using `RootProvider`, skip the matching `Root` for that same instance.
- Use `asChild` for custom host components on Ark parts. The child must be a single element and must keep required
  accessibility and interaction semantics.
- Use the `ark` factory for local standalone polymorphic elements that should behave like Ark elements.
- Use Ark `ids` props when separate Ark components must share accessibility or interaction IDs.
- Do not introduce `render` prop contracts, local state handles, or converted callbacks.

## Core Rules

- Keep the standard component shape:
  - `ComponentName.tsx`
  - `ComponentName.module.css`
  - `ComponentName.stories.tsx`
  - `component-name.md`
  - `index.ts`
- Use `kebab-case` for component folders and local markdown files.
- Prefer relative imports for component-to-component dependencies inside `src/components`.
- Use `@/lib/moduix/*` imports for shared registry-safe utilities, icons, and foundation code.
- Accept `className` on meaningful visual roots.
- Use stable `data-slot` hooks on exported parts.
- Prefer direct primitive passthrough over custom wrapper logic.
- Prefer composition over feature flags, slot bags, render shims, and prop bags.
- For overlay and floating families, export the real structural parts instead of convenience wrappers that render them internally.
- Keep `Content` reserved for the real upstream content part. Do not overload it to mean `Portal + Positioner + Content`
  or other hidden structural bundles.
- Keep controlled/uncontrolled primitive behavior intact unless the wrapper adds clear value.
- Keep infrastructure slots internal unless they are meaningful consumer building blocks.
- Do not add business logic, extra state layers, speculative APIs, or god components.

For every custom prop, ask:

1. Is this common in production?
2. Can composition already express it?
3. Is it duplicating Ark or Chakra behavior?
4. Does it clearly improve DX?
5. Does it keep the component simple?

If the answer is weak, simplify or remove it.

## Styling and Sync

- Use tokens from `src/core/styles/*`.
- Add public styling tokens to `src/core/styles/theme.css` with `initial` and a nearby default-value comment.
- Preserve Ark `data-scope`, `data-part`, `data-state`, and component-specific state attributes on styled parts.
- Keep `data-slot` hooks as moduix-facing stable selectors layered on top of Ark attributes.
- Use Ark runtime CSS variables such as positioning, sizing, transform-origin, and measured height variables when the
  primitive exposes them. Do not replace those with duplicated measurements.
- Prefer CSS animations tied to Ark state attributes. Use Ark `present` only when JavaScript animation libraries need
  control over exit mounting.
- Keep selectors flat and readable. Remove dead classes, modifiers, and obsolete CSS variables.
- Put demo-only layout styles in stories CSS, not library CSS.
- Stories and local component markdown must match the shipped API.
- Stories should cover provider/context/state examples when the wrapper exposes those Ark surfaces, not only the basic
  rendered parts.
- Remove deleted props, obsolete customization paths, and outdated examples in the same task.
- If API, behavior, styling hooks, or recommended usage changed, update local component markdown in the same task.
- If docs become inaccurate, apply `cross-package-sync`.
- If a registry-shipped component changes public styling, import contract, or registry dependencies, update `registry.json` and run `npm run build:registry`.
- Simplification must preserve accessibility behavior, keyboard navigation, focus management, screen reader behavior,
  Ark lifecycle/state/transitions, and meaningful styling hooks.

## Validation

Run the required checks from `AGENTS.md` after changes.

When `packages/react` changed, treat `npm run build:ui` and `npm run tsc:check` as a strict sequence:

1. run `npm run build:ui`
2. wait for it to complete successfully
3. only then run `npm run tsc:check`

Do not run those two commands in parallel.