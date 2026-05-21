# Skill: docs-workflow

Use this skill for work in `apps/docs`.

## Scope

- MDX component pages
- Docs site content/routing
- Live examples in docs app
- CSS properties and playground documentation

## Read First

1. `AGENTS.md` (repo root)

If docs changes depend on current UI output, build first from root:

```bash
npm run build:ui
```

## Source of Truth

- UI components must be imported from `moduix`.
- Do not duplicate library components inside docs app.
- Reference page template:
  - `apps/docs/content/docs/alert-dialog.mdx`
  - `apps/docs/content/docs/lightbox.mdx`
  - `apps/docs/src/components/examples/alert-dialog.tsx`
  - `apps/docs/src/components/examples/lightbox.tsx`

## Structure Rules

- MDX pages: `apps/docs/content/docs/`
- Site components: `apps/docs/src/components/`
- Live examples: `apps/docs/src/components/examples/`
- Example styles: `apps/docs/src/components/examples/<component>.module.css`

Keep demo styles out of inline style objects and utility string class names; use CSS Modules.

## MDX and Example Rules

- MDX should focus on documentation structure/text/snippets.
- Interactive logic, example data, and `cssProperties` lists belong in example `.tsx`.
- Snippets should show consumer usage from `moduix` and be self-contained for each preview variant.
- Do not repeat global setup imports like `import "moduix/style.css";` or `import * as React from "react";`.
- Prefer `as T` over generic syntax like `useState<T>()` in MDX snippets.
- Keep `Anatomy` and `Composition` non-duplicative:
  - `Anatomy` explains parts/slots and structure.
  - `Composition` explains API usage patterns (`render`, controlled props, `className`, `classNames`, slot escape hatches).
- For components with meaningful defaults, include a compact defaults table in `Composition`
  (`Prop` / `Default` / `Values`) so runtime behavior is visible in docs.
  Do not place prop defaults in `Anatomy`.

## Section Order Contract

For component pages, keep order:

1. Frontmatter
2. `BaseUIReference`
3. `Basic` preview
4. Tabs with code and CSS docs (`CSS Properties` + `CSS Playground` split when needed)
5. `## Anatomy`
6. `## Composition` (when meaningful)
7. `## Examples`

Inside `Examples`, order by learning flow (common -> controlled/stateful -> customization -> edge/accessibility).

## CSS Variables Documentation

- `CSS Properties` must list full public `--<component>-*` contract from `packages/ui/src/styles/theme.css`.
- `CSS Playground` should expose only a safe subset that does not flatten documented variants globally.
- Keep CSS variable entries sorted alphabetically in both `CSS Properties` and `CSS Playground`. Exception: size scale groups with `-xs/-sm/-md/-lg/-xl` must be ordered from `xs` to `xl`.

## Done Criteria

1. Docs page and live examples follow template and section ordering.
2. Snippets are consumer-oriented and self-contained.
3. Example styles are in colocated CSS modules.
4. For every changed UI component, docs `CSS Properties` tab includes the full public `--<component>-*` variables from `packages/ui/src/styles/theme.css`; `CSS Playground` stays a safe subset.
5. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`