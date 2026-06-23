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
- Prefer `as T` over `useState<T>()` in MDX.
- Prefer short, production-like examples over exhaustive configuration demos.
- Keep demo styles in colocated CSS Modules when that is clearer than inline styles.
- Use existing pages as structure references, not as permission to keep stale complexity.
- Component pages must follow `references/component-doc-patterns.md`; keep page structure, preview snippets,
  Ark-alignment rules, and CSS-variable documentation there instead of duplicating them in this skill.
- Public snippets must show the current consumer path from `moduix`, including Ark composition, callbacks,
  provider/context hooks, data setup, and recursive renderers when those are required to use the component.
- Live examples may use internal helpers for maintainability, but the visible `Preview.Code` should stay complete and
  consumer-facing.

## Registry Docs

- Keep the full shadcn/GitHub registry setup flow in `quick-start.mdx`, not on every component page.
- On component pages, put `Install with shadcn` immediately after `Basic` and show only the `add` commands.
- Keep `index.mdx`, `quick-start.mdx`, `composition-patterns.mdx`, and `tokens.mdx` aligned when install flow, token entrypoints, or ownership guidance changes.
- Treat `registry.json` as the source of truth. `npm run build:registry` generates JSON artifacts into `packages/react/registry/default`.

## Validation

Run the required checks from `AGENTS.md` after changes.