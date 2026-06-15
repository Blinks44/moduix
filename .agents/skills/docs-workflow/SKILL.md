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
- For `shadcn`/GitHub registry docs, keep the full preparation flow in `quick-start.mdx`: root `tsconfig.json`, `tsconfig.app.json`, bundler alias, temporary `components.json` workaround when still required, `shadcn add`, required `@/lib/moduix/styles/style.css` import, then imports from generated files.
- The root `registry.json` is the source of truth for registry items, and `npm run build:registry` generates JSON artifacts into `packages/ui/registry/default` via `shadcn build`.
- Keep `index.mdx`, `quick-start.mdx`, `composition-patterns.mdx`, and `tokens.mdx` aligned whenever install paths, token entrypoints, or ownership guidance changes.
- On component pages, put registry install guidance directly after the basic example. Show only the `add` commands there; do not repeat the full `init` walkthrough or stylesheet import on every page.
- Load `references/component-doc-patterns.md` for preview, family-specific, and CSS-variable doc rules instead of duplicating them here.
- Use a consistent consumer-first component page structure across docs. Prefer the same section order on every component page and only omit sections that would be empty or meaningless.

## Structure Guidance

- MDX pages live in `apps/docs/content/docs/`.
- Live examples live in `apps/docs/src/components/examples/`.
- Component pages should follow this structure in order:
  1. `## API Reference`
  2. `## Choosing the right component` (optional)
  3. `## Basic`
  4. `## Install with shadcn (optional)`
  5. `## Anatomy`
  6. `## Composition`
  7. `## Examples`
  8. `## Styling` (optional)
- Inside `## Composition`, use these subsections in order when they carry real value:
  1. `### When to stay high-level`
  2. `### When to go custom`
  3. `### Default props` (optional)
  4. `### Behavioral notes` (optional)
- Inside `## Styling`, use these subsections when relevant:
  1. `### CSS Properties` (optional)
  2. `### Styling hooks` (optional)
- Rename old `Default Path` sections to `Basic`.
- `API Reference` should stay minimal: one upstream reference block, no extra prose.
- Use `Choosing the right component` only when a component has close conceptual neighbors and consumers need a quick selection guide.
- `Basic` is the recommended happy path. It should contain the first runnable snippet and a short explanation of when to start with that composition.
- Put registry install guidance directly after `Basic`.
- Keep `Anatomy` short: ASCII tree plus concise part roles.
- Use `Composition` for public contract guidance, not for repeating anatomy.
- `Examples` should move from the basic path to narrower, more specific, or more advanced cases. Do not duplicate the `Basic` example there.
- Use `Custom Composition` only as an example label inside `Examples` when a low-level escape hatch is worth showing.

## Done Criteria

1. Docs match the shipped API and recommended usage.
2. Snippets are concise, self-contained, and consumer-oriented.
3. Required validation from `AGENTS.md` passed.