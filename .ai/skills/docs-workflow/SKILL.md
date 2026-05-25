# Skill: docs-workflow

Use this skill for work in `apps/docs`.

## Scope

- MDX component pages
- Docs site content and routing
- Live examples
- CSS properties and playground documentation

## Read First

1. `AGENTS.md` (repo root)

If docs depend on changed UI output, run `npm run build:ui` from repo root before validating docs behavior.

## Source of Truth

- Import UI components from `moduix`.
- Do not duplicate library components inside the docs app.
- Use existing docs pages and examples as structure references, not as permission to preserve old complexity.

## Documentation Goal

Docs must reflect the simplified component architecture:

- thin wrapper over Base UI
- composition-first usage
- minimal public API
- minimal customization surface

If an API, type, prop, slot, or styling hook was removed, docs should stop teaching it immediately.

## Structure Rules

- MDX pages live in `apps/docs/content/docs/`
- Live examples live in `apps/docs/src/components/examples/`
- Example styles live in colocated CSS Modules

Keep demo styles out of inline style objects and utility-heavy strings when a CSS Module is clearer.

## MDX and Example Rules

- MDX should stay focused on the public API and the most useful usage patterns.
- Put interactive logic, example data, and `cssProperties` lists in the example `.tsx` file.
- Snippets should show consumer usage from `moduix` and be self-contained for the shown variant.
- Do not repeat global setup imports like `import "moduix/style.css";`.
- Prefer `as T` over generic syntax like `useState<T>()` in MDX snippets.
- Prefer short, production-like examples over exhaustive configuration demos.
- Prefer composition examples over customization APIs when both express the same outcome.

## Section Guidance

For component pages, keep the existing page structure unless the task requires a change. Within that structure:

- `Anatomy` should explain the parts that actually matter to consumers.
- `Composition` should explain the current supported usage patterns.
- `Examples` should move from common cases to narrower cases.

Do not keep sections whose only purpose is to explain removed complexity such as legacy slot APIs, deep customization paths, or deleted feature flags.

## CSS Variables Documentation

- `CSS Properties` must document the full public `--<component>-*` contract from `packages/ui/src/styles/theme.css`.
- `CSS Playground` should expose only a safe, useful subset.
- Keep CSS variable entries sorted alphabetically, except ordered size scales (`xs` to `xl`).

## Done Criteria

1. Docs describe the real current API and usage patterns.
2. Removed props, types, and legacy examples are deleted from docs.
3. Snippets are consumer-oriented, concise, and self-contained.
4. Example styles are in colocated CSS modules.
5. For every changed UI component, docs `CSS Properties` reflects the current public variable contract.
6. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`