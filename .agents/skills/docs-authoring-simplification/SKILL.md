---
name: docs-authoring-simplification
description: Simplify documentation authoring in apps/docs without generators, codegen, or example reduction. Use when MDX pages repeat the same ceremony for shadcn install blocks, CSS properties sections, large named example imports, or other docs-only wrappers that can be replaced with small shared helpers and data-first authoring patterns.
---

# Docs Authoring Simplification

Use this skill to reduce repeated authoring work in `apps/docs` while keeping docs explicit and consumer-facing.

## Focus on repeated ceremony

Prefer small shared helpers over broad page builders.

- Good targets:
  - repeated `Install with shadcn` tab blocks
  - repeated CSS properties wrappers that only render shared UI around data
  - long named imports from `@/components/examples/*`
  - repeated MDX scaffolding that does not carry component-specific meaning

- Avoid:
  - code generation
  - AST extraction of example code
  - abstractions that hide the public composition being documented
  - helpers that only pay off for one page

## Keep the authoring model simple

Use these patterns first:

1. Namespace imports in MDX

Replace long named imports with:

```mdx
import * as AccordionDocs from '@/components/examples/accordion';
```

Use dotted access in the page body. This keeps the example module as the source of truth and makes incremental edits cheaper.

2. Shared docs helpers for repeated UI

If many pages repeat the same MDX block, move the wrapper UI into `apps/docs/src/components/mdx.tsx` or another docs-local helper and keep page-specific data in the page or example module.

Good examples:

- `ShadcnInstall` for shared registry install tabs
- `CssPropertiesSection` for the standard CSS variables tab wrapper

Keep helpers narrow. They should remove duplication, not invent a page DSL.

3. Data-first example exports

Prefer exporting reusable data from `apps/docs/src/components/examples/*.tsx` over exporting page-specific wrapper components that only render shared docs UI.

Good:

- `accordionOverrideCssProperties`
- `accordionExampleCss`
- `accordionItemsData`

Less useful:

- `AccordionCssPropertiesPanel` when it only wraps shared table UI around exported data
- many page-only helper wrappers with no behavior of their own

## Preserve docs clarity

Do not simplify by hiding the documented component structure.

- Keep public snippets consumer-facing.
- Keep Ark composition explicit where the reader needs it.
- Keep example-specific code, CSS, and data visible through `Preview.Code`, `Preview.CSS`, and `Preview.Data`.
- Only factor out the surrounding authoring boilerplate.

## Workflow

1. Identify repeated docs-only ceremony in the target page.
2. Check whether the repetition already appears on other pages.
3. Extract the smallest shared helper that removes the repetition.
4. Prefer data exports over wrapper component exports in example modules.
5. Apply the helper to one real page first.
6. Review whether the page became shorter, the import surface smaller, and the authoring path more direct.

## Done criteria

- The page keeps the same reader-facing structure.
- The change removes repeated MDX or docs-only wrapper code.
- The resulting helper is small enough to reuse on additional pages.
- Validation from `AGENTS.md` passes.