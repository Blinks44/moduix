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
4. `packages/ui` output and local component docs when docs depend on changed UI behavior

## Core Rules

- Import public components from `moduix`. Do not duplicate library components inside the docs app.
- Document the shipped public API only. Remove stale props, examples, styling hooks, and legacy guidance in the same task.
- Keep MDX consumer-facing. Put interactive logic, bulky example data, and `cssProperties` arrays in example `.tsx` files.
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
- When a component has a dedicated Ark UI examples section, moduix docs examples should cover at least 80% of
  those upstream Ark examples, adapted to the public moduix API and merged only when examples teach the same
  consumer-facing pattern.
- moduix additions must be documented as a second layer on top of Ark behavior. Do not replace the Ark mental
  model with a local-only narrative.
- For form components, show Ark `Field` / `Fieldset` context integration and include `HiddenInput` wherever the
  shipped control needs native form submission or reset behavior.
- For custom host elements, teach `asChild` and keep examples to a single semantic child. Do not use Base UI `render`
  examples in Ark-backed docs.
- For state access, document the Ark choice that fits the example: `Component.Context` for inline reads,
  `use*Context` for custom child parts, and `useComponent` plus `RootProvider` for state controlled outside the tree.
- For animated mounted content, show CSS state selectors first and mention `present` only when JavaScript exit
  animation control is the reason.
- If a component has no dedicated Ark UI primitive page, say that explicitly in `API Reference` and anchor the
  page to the relevant Ark guide or factory model plus Chakra anatomy when Chakra informs the public contract.
- For root-only components where the public export is the same root component with `.Root` attached, teach the
  short `<Component />` form in consumer docs and snippets. Mention `<Component.Root />` only as the equivalent
  Ark-aligned namespace form when that helps explain anatomy or consistency with multi-part components.

## Registry Docs

- Keep the full shadcn/GitHub registry setup flow in `quick-start.mdx`, not on every component page.
- On component pages, put `Install with shadcn` immediately after `Basic` and show only the `add` commands.
- Keep `index.mdx`, `quick-start.mdx`, `composition-patterns.mdx`, and `tokens.mdx` aligned when install flow, token entrypoints, or ownership guidance changes.
- Treat `registry.json` as the source of truth. `npm run build:registry` generates JSON artifacts into `packages/ui/registry/default`.

## Validation

Run the required checks from `AGENTS.md` after changes.

If docs validation depends on changed `packages/ui` output, wait for `npm run build:ui` to finish
successfully before starting `npm run tsc:check`. Do not run those commands in parallel.