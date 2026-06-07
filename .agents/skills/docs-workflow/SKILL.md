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
- CSS properties and playground documentation

## Read First

1. `AGENTS.md`
2. `packages/ui` output and local component docs when docs depend on changed UI behavior
3. `references/component-doc-patterns.md` when the task touches popup/dialog families, preview snippets, or CSS variable sections

## Source of Truth

- Import components from `moduix`.
- Do not duplicate library components inside the docs app.
- Use existing pages as structure references, not as permission to preserve old complexity.

## Rules

- Docs should describe the current public API: thin wrapper, composition first, simple path first.
- Delete docs for removed props, types, slot APIs, styling hooks, and legacy examples in the same task.
- Keep MDX focused on public usage. Put interactive logic, example data, and `cssProperties` arrays in example `.tsx` files.
- Prefer `as T` over `useState<T>()` in MDX.
- Prefer short, production-like examples over exhaustive configuration demos.
- Keep demo styles in colocated CSS Modules when that is clearer than inline styles.
- For `shadcn`/GitHub registry docs, keep the full preparation flow in `quick-start.mdx`: root `tsconfig.json`, `tsconfig.app.json`, bundler alias, temporary `components.json` workaround, `shadcn add`, required `@/lib/moduix/styles/style.css` import, then imports from generated files.
- Keep `index.mdx`, `quick-start.mdx`, `composition-patterns.mdx`, and `tokens.mdx` aligned whenever install paths, token entrypoints, or ownership guidance changes.
- On component pages, put registry install guidance directly after the basic example. Show only the `add` commands there; do not repeat the full `init` walkthrough or stylesheet import on every page.
- Load `references/component-doc-patterns.md` for preview, family-specific, and CSS-variable doc rules instead of duplicating them here.

## Structure Guidance

- MDX pages live in `apps/docs/content/docs/`.
- Live examples live in `apps/docs/src/components/examples/`.
- For component pages, keep the existing structure unless the task requires a change.
- `Examples` should move from the default path to narrower or advanced cases.
- Use `Custom Composition` for low-level escape hatches when needed.

## Done Criteria

1. Docs match the shipped API and recommended usage.
2. Snippets are concise, self-contained, and consumer-oriented.
3. Required validation from `AGENTS.md` passed.