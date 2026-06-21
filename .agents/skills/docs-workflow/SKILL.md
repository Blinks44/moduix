---
name: docs-workflow
description: Use for work in apps/docs, including MDX pages, live examples, and CSS variable documentation.
---

# Skill: docs-workflow

Use this skill for work in `apps/docs`.

## Scope

- MDX component pages
- docs site content and routing
- live examples
- CSS properties documentation

## Read First

1. `AGENTS.md`
2. `references/component-doc-patterns.md` for component-page structure, preview rules, and CSS-variable sections
3. `apps/docs/content/docs/select.mdx` as the current reference implementation for standardized component pages
4. `packages/react` output and local component docs when docs depend on changed UI behavior

## Core Rules

- Import public components from `moduix`. Do not duplicate library components inside the docs app.
- Document the shipped public API only. Remove stale props, examples, styling hooks, and obsolete guidance in the same task.
- Keep MDX consumer-facing. Put interactive logic, bulky example data, and `cssProperties` arrays in example `.tsx` files.
- For component docs, every substantial example preview should include `Code`, `Styles`, and `Data` tabs via
  `Preview.Code`, `Preview.CSS`, and `Preview.Data`. Put shared arrays, fixture objects, and setup constants in
  `Preview.Data`; do not hide required code behind comments, ellipses, or prose.
- Prefer `as T` over `useState<T>()` in MDX.
- Prefer short, production-like examples over exhaustive configuration demos.
- Keep demo styles in colocated CSS Modules when that is clearer than inline styles.
- Use existing pages as structure references, not as permission to preserve old complexity.
- For popup and dialog families, teach the explicit Ark/Chakra composition path as the default example structure.
- Use documentation snippets and curated examples to reduce perceived verbosity instead of inventing hidden structural wrappers.
- Every example in `## Examples` must have a short lead-in sentence or short paragraph before the preview.
  Do not place a heading and immediately render `<Preview>`.
- Example lead-ins should explain what the example is for, what prop/state/composition choice it demonstrates,
  or when to prefer that pattern. Use upstream Ark framing when helpful, but keep the wording consumer-facing.
- In `Examples`, use `Custom Composition` only for real structure/render-path changes. Use
  `Custom Styling` for examples that only customize `className`, CSS variables, or styling hooks.
- Component docs in `apps/docs/content/docs/*.mdx` must follow one mandatory page structure so pages stay
  visually and semantically consistent across the library.
- If a component has a dedicated Ark UI page, the docs page must mirror the upstream Ark mental model first:
  anatomy, recommended composition path, relevant examples, guides, state hooks, and styling hooks that the
  moduix wrapper still exposes.
- If a component has a dedicated Ark UI page, `## API Reference` must render the same standalone
  `<PrimitiveReference href="https://ark-ui.com/docs/components/<component-slug>" />` block used by `accordion`.
  Do not replace that block with prose-only API summaries.
- When a component has a dedicated Ark UI examples section, moduix docs examples should cover at least 80% of
  those upstream Ark examples, adapted to the public moduix API and merged only when examples teach the same
  consumer-facing pattern.
- If a component has no dedicated Ark UI primitive page, do not apply the 80% Ark example rule mechanically. State
  that no Ark primitive exists, then document the shipped moduix API, accessibility semantics, styling hooks, and any
  Ark factory/composition guidance that actually applies.
- If a component has no dedicated Ark UI primitive page, write `API Reference` as one compact paragraph with inline
  links to the relevant Ark guide or primitive page plus any Chakra recipe reference. Do not use a bullet list of
  upstream links in that section.
- moduix additions must be documented as a second layer on top of Ark behavior. Do not replace the Ark mental
  model with a local-only narrative.
- For form components, show Ark `Field` / `Fieldset` context integration and include `HiddenInput` wherever the
  shipped control needs native form submission or reset behavior.
- For custom host elements, teach `asChild` and keep examples to a single semantic child. Do not use `render` prop
  examples in Ark-backed docs.
- For state access, document the Ark choice that fits the example: `Component.Context` for inline reads,
  `use*Context` for custom child parts, and `useComponent` plus `RootProvider` for state controlled outside the tree.
- When docs import provider/context hooks from `moduix`, verify the package barrel exports them. A docs example that
  only works against an internal component file is not valid public documentation.
- For animated mounted content, show CSS state selectors first and mention `present` only when JavaScript exit
  animation control is the reason.
- If a component has no dedicated Ark UI primitive page, say that explicitly in `API Reference` and anchor the
  page to the relevant Ark guide or factory model plus Chakra anatomy when Chakra informs the public contract.
- For root-only components where the public export is the same root component with `.Root` attached, teach the
  short `<Component />` form in consumer docs and snippets. Mention `<Component.Root />` only as the equivalent
  Ark-aligned namespace form when that helps explain anatomy or consistency with multi-part components.
- In `## Anatomy`, always include a markdown table with `Part` and `Role` columns after the structure tree.
- In that anatomy table, always put the root entry first and format it as `` `Component` / `Component.Root` `` so
  docs teach the short root consumer form while preserving Ark namespace equivalence.
- In `### Default props`, use a markdown table (for example `Prop | Default | Notes`) instead of prose-only defaults.
- In docs previews and snippets (`Preview`, `Preview.Code`, and similar runnable examples), always use the short root
  form (`<Component>`) instead of `<Component.Root>`. Keep other parts namespaced (for example `<Accordion.Item>`).

## Registry Docs

- Keep the full shadcn/GitHub registry setup flow in `quick-start.mdx`, not on every component page.
- On component pages, put `Install with shadcn` immediately after `Basic` and show only the `add` commands.
- Keep `index.mdx`, `quick-start.mdx`, `composition-patterns.mdx`, and `tokens.mdx` aligned when install flow, token entrypoints, or ownership guidance changes.
- Treat `registry.json` as the source of truth. `npm run build:registry` generates JSON artifacts into `packages/react/registry/default`.

## Validation

Run the required checks from `AGENTS.md` after changes.

If docs validation depends on changed `packages/react` output, wait for `npm run build:ui` to finish
successfully before starting `npm run tsc:check`. Do not run those commands in parallel.