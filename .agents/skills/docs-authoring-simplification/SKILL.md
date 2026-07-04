---
name: docs-authoring-simplification
description: Simplify documentation authoring in apps/docs without generators, codegen, or example reduction. Use when MDX pages repeat the same ceremony for shadcn install blocks, CSS properties sections, large named example imports, or other docs-only wrappers that can be replaced with small shared helpers and include-based code snippets.
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

3. Keep example fixtures inside visible snippets

Do not split small example data into a separate docs tab or a separate exported string. Keep the
fixture data directly inside the visible `Preview.Code` snippet so the example stays self-contained.

Good:

- `accordionOverrideCssProperties`
- `accordionExampleCss`
- `const items = [...]` directly inside the displayed snippet

Less useful:

- `AccordionCssPropertiesPanel` when it only wraps shared table UI around exported data
- `accordionItemsData` when it only duplicates the array already needed in the snippet
- many page-only helper wrappers with no behavior of their own

4. Use Fumadocs `<include>` selectively

Use `<include>` for `Preview.Code` when a snippet is long enough that keeping it inline makes the
MDX page noisy.

Keep the snippet in a docs-local `_snippets/` file and include a named region:

```mdx
<Preview.Code>
  <include lang="tsx">./_snippets/accordion/basic.tsx#demo</include>
</Preview.Code>
```

Do not use `Preview.Data` on component pages by default. Move the required data into the code
snippet itself and include that snippet with `<include>`.

Keep `Preview.CSS` separate when local example styles add clarity, but keep the visible data setup
inside the code snippet.

5. `basic.tsx` snippets are required for component-page Basic examples

For component pages in `apps/docs/content/docs/*.mdx`, the `## Basic` example must use a docs-local
snippet file at `./_snippets/<component>/basic.tsx` and include it in `Preview.Code`.

Required pattern:

```mdx
<Preview.Code>
  <include lang="tsx">./_snippets/accordion/basic.tsx#demo</include>
</Preview.Code>
```

The snippet must be self-contained and consumer-facing:

- keep example data inside the snippet
- use `//#region demo` / `//#endregion`
- do not use `Preview.Data` for the Basic example
- keep `Preview.CSS` in MDX only when separate CSS still improves readability

Treat this as mandatory authoring structure, not an optional cleanup, when simplifying component
documentation.

## Preserve docs clarity

Do not simplify by hiding the documented component structure.

- Keep public snippets consumer-facing.
- Keep Ark composition explicit where the reader needs it.
- Keep example-specific code and data visible in `Preview.Code`.
- Use `Preview.CSS` only for example-local styles that are worth reading separately.
- Only factor out the surrounding authoring boilerplate.
- Prefer `include` for code snippets; avoid spreading small fixtures across extra files and tabs.
- For `## Basic` on component pages, use the required `./_snippets/<component>/basic.tsx` include
  instead of inline MDX code.

## Workflow

1. Identify repeated docs-only ceremony in the target page.
2. Check whether the repetition already appears on other pages.
3. Extract the smallest shared helper that removes the repetition.
4. Prefer self-contained snippets over separate fixture exports.
5. Apply the helper to one real page first.
6. Review whether the page became shorter, the import surface smaller, and the authoring path more direct.

## Done criteria

- The page keeps the same reader-facing structure.
- The change removes repeated MDX or docs-only wrapper code.
- The resulting helper is small enough to reuse on additional pages.
- Validation from `AGENTS.md` passes.