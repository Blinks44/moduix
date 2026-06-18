---
name: ark-ui-migration
description: Use for full component migration from Base UI or custom wrappers to Ark UI contracts in packages/ui and synced docs.
---

# Skill: ark-ui-migration

Use this skill when migrating a component family to Ark UI as the new source of truth.

## Goal

Complete migration to Ark UI contracts, naming, behavior, and composition across implementation, stories, docs, and registry output.

Breaking changes are allowed. Do not keep legacy Base UI compatibility shims unless explicitly requested.

Current phase scope: React migration only. Use Ark React primitives (`@ark-ui/react/*`) and do not introduce
Solid/Vue/Svelte-specific APIs or docs paths in this migration track.

## Sources

- Ark UI routing index: `https://ark-ui.com/llms.txt`
- Prefer Ark MCP from `.ai/mcp/mcp.json` when direct fetch is blocked by site protection.
- Component mdx docs pattern: `https://ark-ui.com/docs/components/<component-slug>.mdx`
- Component docs pattern: `https://ark-ui.com/docs/components/<component-slug>`
- If the component MDX URL is blocked by a security checkpoint, use the same upstream content from the public
  `chakra-ui/ark` repository, preferably `website/src/content/pages/components/<component-slug>.mdx`, and note the
  fallback in the work summary.
- Ark ref guide: `https://ark-ui.com/docs/guides/ref`
- Ark forms guide: `https://ark-ui.com/docs/guides/forms`
- Ark animation guide: `https://ark-ui.com/docs/guides/animation`
- Ark component state guide: `https://ark-ui.com/docs/guides/component-state`
- Ark composition guide: `https://ark-ui.com/docs/guides/composition`
- Ark styling guide: `https://ark-ui.com/docs/guides/styling`
- Chakra UI component docs: `https://chakra-ui.com/docs/components/<component-slug>`
- Chakra UI mdx component docs: `https://chakra-ui.com/docs/components/<component-slug>.mdx`

Before changing any Ark UI-backed component, first analyze the target component and collect current upstream context
from either Ark MCP or the online MDX documentation at `https://ark-ui.com/docs/components/<component-slug>.mdx`.
For components that have no dedicated Ark primitive, do not invent an Ark component contract; document that there is no
Ark primitive and anchor the review to Ark factory/composition/styling guidance plus any Chakra recipe that materially
informs the public contract.

## Scope

- `packages/ui/src/components/<component-name>/*`
- related exports and stories in `packages/ui`
- docs/examples in `apps/docs` for migrated public API
- registry sync when registry-shipped files changed

## Migration Rules

- Replace Base UI primitive imports with Ark UI package imports.
- Adopt Ark part names and composition exactly (for example, `Root`, `Item`, `ItemTrigger`, `ItemContent`).
- Use Ark and Chakra docs as the source of truth for overlay and popup composition.
- Rewrite migrated documentation fully around Ark UI. Do not do partial Base UI carry-over edits just to "adapt" old docs.
- Treat old Base UI-oriented docs as disposable migration input, not as the target structure.
- Public docs and local component markdown should show the Ark UI mental model first: parts, composition, state
  shapes, callback signatures, and structural requirements.
- In docs `### CSS Properties`, use the same moduix docs wrapper as `accordion`: `not-prose` container, docs `Tabs`
  with a `CSS Variables` tab, and a bounded scroll area around the reference table.
- In migrated component docs, every `<Preview>` example should expose `Code`, `Styles`, and `Data` tabs. Put shared
  arrays, records, and bulky constants in `<Preview.Data>` instead of hiding them in comments or prose. If an example
  truly has no data, provide the smallest useful setup data or explain the exception in the docs change summary.
- Cover the full Ark example surface that is relevant to the migrated component family. If Ark docs show multiple
  important usage patterns, reproduce those patterns in moduix docs/examples instead of keeping only the old Base UI
  subset.
- If moduix provides extra sugar on top of Ark (for example default visuals, helper leaf parts, or thin DX wrappers),
  document those as additional examples layered after the core Ark examples, not as replacements for Ark composition.
- Keep moduix wrappers as thin Ark-aligned wrappers, not alternative component APIs.
- Prefer Ark callback and state shapes without re-mapping (for example, keep `onValueChange(details)` and use `details.value`).
- Remove legacy prop aliases and converted callback signatures from old wrappers.
- Remove adapter logic that only exists for backward compatibility.
- Keep wrappers thin: styling defaults, `className`, `data-slot`, and minimal DX sugar only.
- Forward refs to the Ark DOM part consumers need to target. For form integrations, this is the part that should
  receive invalid focus.
- Preserve Ark `HiddenInput` parts for controls that participate in native form submission or form reset.
- Use Ark `Field.Root` and `Fieldset.Root` context for shared `disabled`, `invalid`, `required`, and `readOnly`
  state instead of local form-state wiring.
- Use Ark state access patterns directly:
  - `Component.Context` for inline render-prop state reads
  - `use*Context` hooks for reusable child components
  - `useComponent` plus `RootProvider` for state owned outside the rendered tree
- When an Ark primitive namespace exposes `RootProvider`, `Context`, `ItemContext`, `useComponent`,
  `use*Context`, or related exported types, expose the matching surface from the moduix wrapper and package barrel
  unless there is an intentional, documented reason not to. Verify docs imports from `moduix` compile against the
  public barrel, not just the component file.
- When using `RootProvider`, do not also render the matching `Root` for the same state instance.
- Use `asChild` for custom host elements and keep the child single, semantic, and capable of the required
  interaction behavior.
- Use Ark `ids` props when multiple components or parts need shared IDs for accessibility or interaction wiring.
- Keep structural composition explicit for overlay and floating families. Do not hide `Portal`, `Positioner`, `Backdrop`,
  `Content`, `Popup`, `Viewport`, or equivalent structural parts behind high-level `*Content` convenience wrappers.
- Allowed sugar should stay narrow and leaf-level: default icons, `Arrow` with built-in `ArrowTip` when the upstream
  family supports it, or close triggers with default visuals. Do not let sugar replace the real composition model.
- Keep Ark accessibility, keyboard behavior, focus lifecycle, and state attributes intact.
- Style state through Ark `data-scope`, `data-part`, `data-state`, component state attributes, and CSS variables
  exposed by Ark measurements/state (for example, `--height`, available size, reference size, and transform origin
  where applicable).
- Follow Ark styling mechanics (parts/state attributes/CSS variable patterns), but map visuals to moduix design
  tokens and contracts (colors, radii, spacing, typography, shadows, motion).
- Prefer CSS keyframes on Ark open/closed state attributes for mount and unmount transitions. Use Ark `present` when
  JavaScript animation libraries need to complete exit animations before unmount.
- Do not copy Ark visual defaults; preserve moduix visual identity while aligning implementation patterns.
- Remove Base UI remnants created by migration drift (imports, prop aliases, helper wrappers, stale docs references,
  and config entries such as optimizeDeps lists) in the same task.
- Keep `src/styles/theme.css` aligned with the migrated contract: add missing active tokens and remove obsolete
  component-specific variables that are no longer used after migration.

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
- If existing flat aliases conflict with Ark composition, remove them in the same migration.
- Keep `data-slot` names stable and aligned with Ark part names in kebab-case.
- If an old `*Content` name previously meant "hidden structure plus content surface", split it into real Ark parts and
  reserve `Content` only for the actual Ark content part.

## Ark parity over custom component splits

- If Ark models behavior as a prop/mode/variant of one component, moduix must keep it as one component.
- Do not introduce or preserve extra public wrappers that split a single Ark primitive into multiple moduix components.
- Prefer Ark surface shape first (names, parts, props, callback signatures), then add styling/composition only.
- Treat removal of redundant split components as an intentional breaking change during migration.

Example decision applied in this migration wave:

- `AlertDialog` should not remain a separate public component when Ark behavior is represented via `Dialog`
  props/composition; use one `Dialog` API and document the destructive-confirmation variant there.

## Overlay and popup composition

- For popup-like and dialog-like families, prefer the full explicit Ark/Chakra composition path as the documented and
  recommended contract.
- Treat verbosity as acceptable when it preserves local override points for structural parts.
- Do not hide structural override points inside convenience components. If a consumer needs to style or configure one
  structural node, they should be able to do so without rewriting the entire subtree.
- Use docs snippets and examples to make the common path easy instead of adding alternate public APIs that obscure the
  real tree.

## Required Surfaces Per Migration

1. Component TSX/CSS modules in `packages/ui/src/components/<component-name>/`
2. Local component markdown contract (`<component-name>.md`)
3. Stories for the component
4. Public docs/examples in `apps/docs` rewritten for Ark UI when the migrated component is documented there
5. Registry artifacts (`npm run build:registry`) when registry-shipped source changed

## Reference implementation (use as migration template)

Use the migrated `Accordion` as the baseline example of Ark-aligned migration quality and cleanup scope:

- UI wrapper: `packages/ui/src/components/accordion/Accordion.tsx`
- UI styles: `packages/ui/src/components/accordion/Accordion.module.css`
- Local contract doc: `packages/ui/src/components/accordion/accordion.md`
- Public docs page: `apps/docs/content/docs/accordion.mdx`
- Docs examples: `apps/docs/src/components/examples/accordion.tsx`
- Theme tokens: `packages/ui/src/styles/theme.css` (accordion section)

What this reference demonstrates:

- Ark part naming and callback contracts without legacy alias API.
- State/animation styling via Ark attributes and `--height`.
- Synchronized wrapper/docs/examples/theme tokens after migration.
- Removal of Base UI migration leftovers from component contract and docs surfaces.
- Explicit structural composition for overlays instead of shadcn-style hidden `Content` wrappers.
- Docs/examples structured around Ark usage first, with moduix-specific sugar added on top where it exists.
- Full Ark namespace parity, including provider/context hooks and public barrel exports, not only visible rendered
  parts.
- Component previews with `Code`, `Styles`, and `Data` tabs so examples are reproducible without hidden setup.

## Migration Checklist

1. Load and analyze target Ark component context from Ark MCP or `https://ark-ui.com/docs/components/<component-slug>.mdx`.
2. Identify current Base UI/custom contract and target Ark contract.
3. Rewrite wrapper parts to Ark primitives and Ark naming.
4. For overlay and floating families, remove hidden structural sugar and expose explicit Ark composition.
5. For non-primitive components, replace Base `useRender` with Ark `asChild`/`ark` factory or native DOM API.
6. Drop compatibility shims and legacy prop translations.
7. Preserve refs, `HiddenInput`, `Field`/`Fieldset` context, `ids`, context hooks, and `RootProvider` patterns when
   the target Ark component exposes them.
8. Update CSS selectors/state hooks to Ark attributes and variables.
9. Rewrite stories, local markdown, and docs examples to the Ark API and Ark composition model.
10. Ensure docs/examples cover the relevant Ark examples first, then add moduix-specific sugar examples after them.
11. Verify package barrels, docs imports, and registry artifacts expose the same public surface as the component file.
12. Run required repo validation sequence from `AGENTS.md`.
13. Rebuild registry artifacts when required.

## Lessons from current migration wave

- Treat migration as contract replacement, not a thin internal swap.
- Avoid preserving old callback shapes for convenience; this causes long-term drift.
- Keep animation/state logic tied to Ark-provided attributes and measurements.
- Keep docs and examples in lockstep with code changes; stale examples re-introduce legacy API usage.
- Rewrite docs from the Ark source model instead of incrementally editing Base UI-era prose and snippets.
- If Ark docs expose several canonical examples, moduix docs should cover those examples before introducing local sugar.
- Expose and document Ark provider/context/hook surfaces when upstream exposes them; missing barrel exports are API
  bugs even if the component file itself is correct.
- Docs previews should not hide required setup in comments. Use the `Data` tab for items, constants, and fixture data.
- For popup and dialog families, prefer Chakra's explicit composition model over shadcn's hidden structural sugar.
- Keep moduix between Ark/Chakra and shadcn by making wrappers convenient to style and import, not by hiding core
  structural parts.
- If an upstream Ark detail is unclear, resolve from Ark docs/MCP first; do not guess.