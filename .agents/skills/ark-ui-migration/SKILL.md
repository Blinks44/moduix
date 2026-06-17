---
name: ark-ui-migration
description: Use for full component migration from Base UI or custom wrappers to Ark UI contracts in packages/ui and synced docs.
---

# Skill: ark-ui-migration

Use this skill when migrating a component family to Ark UI as the new source of truth.

## Goal

Complete migration to Ark UI contracts, naming, and behavior across implementation, stories, docs, and registry output.

Breaking changes are allowed. Do not keep legacy Base UI compatibility shims unless explicitly requested.

Current phase scope: React migration only. Use Ark React primitives (`@ark-ui/react/*`) and do not introduce
Solid/Vue/Svelte-specific APIs or docs paths in this migration track.

## Sources

- Ark UI routing index: `https://ark-ui.com/llms.txt`
- Prefer Ark MCP from `.ai/mcp/mcp.json` when direct fetch is blocked by site protection.
- Component docs pattern: `https://ark-ui.com/docs/components/<component-slug>`

## Scope

- `packages/ui/src/components/<component-name>/*`
- related exports and stories in `packages/ui`
- docs/examples in `apps/docs` for migrated public API
- registry sync when registry-shipped files changed

## Migration Rules

- Replace Base UI primitive imports with Ark UI package imports.
- Adopt Ark part names and composition exactly (for example, `Root`, `Item`, `ItemTrigger`, `ItemContent`).
- Keep moduix wrappers as thin Ark-aligned wrappers, not alternative component APIs.
- Prefer Ark callback and state shapes without re-mapping (for example, keep `onValueChange(details)` and use `details.value`).
- Remove legacy prop aliases and converted callback signatures from old wrappers.
- Remove adapter logic that only exists for backward compatibility.
- Keep wrappers thin: styling defaults, `className`, `data-slot`, and minimal DX sugar only.
- Keep Ark accessibility, keyboard behavior, focus lifecycle, and state attributes intact.
- Style state through Ark data attributes and CSS variables exposed by Ark measurements/state (for example, `--height` where applicable).

## Components without Base UI primitives (including `useRender` usage)

Some components are not wrappers over Base UI primitives but still depend on Base UI `useRender` for polymorphic
rendering (for example, `Card` and `CardLink` patterns).

For these components:

- Remove `@base-ui/react/use-render` usage during migration.
- Do not preserve Base `render` prop contracts unless explicitly requested.
- Prefer Ark-native composition:
  - use `asChild` when composing with Ark parts that already expose it;
  - use `ark` factory (`@ark-ui/react/factory`) for standalone polymorphic elements.
- For non-polymorphic parts, keep plain React DOM elements and native props (no migration-only abstractions).
- Keep `data-slot` hooks and visual contracts stable unless the migration intentionally changes them.

When replacing `render` with Ark patterns, document the breaking API change in local component markdown and docs
examples in the same task.

## Naming and API Contract

- Ark naming wins over historical moduix naming when they conflict.
- Public part names in docs, stories, and examples must match Ark naming.
- Remove wrappers/parts that have no Ark equivalent unless there is explicit product-level justification.
- If existing flat aliases conflict with Ark composition, remove or rename them in the same migration.
- Keep `data-slot` names stable and aligned with Ark part names in kebab-case.

## Ark parity over custom component splits

- If Ark models behavior as a prop/mode/variant of one component, moduix must keep it as one component.
- Do not introduce or preserve extra public wrappers that split a single Ark primitive into multiple moduix components.
- Prefer Ark surface shape first (names, parts, props, callback signatures), then add styling/composition only.
- Treat removal of redundant split components as an intentional breaking change during migration.

Example decision applied in this migration wave:

- `AlertDialog` should not remain a separate public component when Ark behavior is represented via `Dialog`
  props/composition; use one `Dialog` API and document the destructive-confirmation variant there.

## Required Surfaces Per Migration

1. Component TSX/CSS modules in `packages/ui/src/components/<component-name>/`
2. Local component markdown contract (`<component-name>.md`)
3. Stories for the component
4. Public docs/examples in `apps/docs` when API or naming changed
5. Registry artifacts (`npm run build:registry`) when registry-shipped source changed

## Migration Checklist

1. Identify current Base UI/custom contract and target Ark contract.
2. Rewrite wrapper parts to Ark primitives and Ark naming.
3. For non-primitive components, replace Base `useRender` with Ark `asChild`/`ark` factory or native DOM API.
4. Drop compatibility shims and legacy prop translations.
5. Update CSS selectors/state hooks to Ark attributes and variables.
6. Update stories, local markdown, and docs examples to Ark API.
7. Run required repo validation sequence from `AGENTS.md`.
8. Rebuild registry artifacts when required.

## Lessons from current migration wave

- Treat migration as contract replacement, not a thin internal swap.
- Avoid preserving old callback shapes for convenience; this causes long-term drift.
- Keep animation/state logic tied to Ark-provided attributes and measurements.
- Keep docs and examples in lockstep with code changes; stale examples re-introduce legacy API usage.
- If an upstream Ark detail is unclear, resolve from Ark docs/MCP first; do not guess.