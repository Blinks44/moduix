---
name: docs-workflow
description: Use for Rspress documentation content in apps/docs across every configured locale - MDX pages, runnable examples, component-page guidance, CSS-variable references, registry documentation, and source-to-locale content consistency.
---

# Docs Workflow

Own consumer-facing documentation in `apps/docs` across every configured locale. Keep it truthful to the shipped package and easy to use; prefer the smallest complete example over a configurable demo.

This skill owns documentation content and source-to-locale consistency. It does not own Rspress configuration, theme customization, translation implementation, or description-frontmatter work. Apply the corresponding focused skill when that surface changes, especially `rspress-localization` for any localized content.

## Read first

1. `AGENTS.md` and the affected MDX page.
2. The corresponding default-language page (currently English) and the affected locale pages. Use `rspress-localization` for the translation itself.
3. The shipped component API, its local markdown, and its existing examples when the page documents a component.

## Documentation contract

- Document only the shipped public API. Remove stale props, examples, styling hooks, and guidance in the same task.
- Keep package implementation, public docs, snippets, registry guidance, and supported imports aligned. Teach the recommended path before lower-level composition.
- Use public imports from `@moduix/react`; do not recreate library components in the docs app.
- Keep prose and snippets consumer-facing, complete, and production-like. Do not hide required setup, callbacks, collection data, or Ark composition behind docs-only helpers.
- Prefer a small local helper to repeated visible ceremony, but never a page builder, hidden DSL, or abstraction that hides the documented composition.
- Keep demo-only styling in the docs app or example CSS module, separate from library styling.

## Cross-locale component-page consistency

When editing localized component pages, also use `rspress-localization`. Treat the default-language
page as the canonical source for public API coverage, information architecture, example intent, and
heading hierarchy. A localized page must preserve that contract unless the task explicitly records an
intentional product difference.

Treat repeated component section headings as controlled terminology within each locale: use one
established, idiomatic rendering for the same source heading across matching component pages. Review
the existing accepted pages in the target locale before introducing a new translation. Do not translate
public component names or API identifiers merely because they appear in a heading.

Apply the same rule to recurring secondary headings and migration guidance. Keep contextual headings
specific when the same source word has genuinely different meanings, such as `Multiple` in an
accordion and a date picker. Preserve source-language wording for headings that are established public
names rather than prose.

When the default-language page changes, update every affected locale in the same task or explicitly
report each intentional translation gap. Before completing localized work, compare the matching
default-language and target-locale heading sequences and resolve unexplained differences.

## Component pages

For a new, migrated, or substantially restructured component page, read [the component-page contract](references/component-pages.md). It defines section order, Ark-alignment coverage, and styling-reference expectations.

## Runnable previews

- Use Rspress's `tsx preview file="./_snippets/<component>/<name>.tsx"` directive for runnable component-page examples.
- Use `basic.tsx` for the basic path and stable heading-based filenames for subsequent examples.
- Keep a visible snippet self-contained and copyable. Prefer one complete component composition over indirection through hidden helpers.
- Do not add an interactive playground unless the task explicitly requires token editing and the interaction teaches more than static documentation.

Read [preview rules](references/previews.md) whenever adding or changing a preview frame, preview metadata, virtual-file import, or a nontrivial snippet.

## CSS variables and registry docs

- Cover a component's full public `--<component>-*` contract from `packages/react/src/styles/variables-moduix.css` using the shared CSS variables reference UI; do not duplicate it in prose.
- Keep styling hooks limited to meaningful `className`, `data-slot`, and state attributes that consumers can target.
- Keep the full hosted-registry setup in `quick-start.mdx`; component pages show only the relevant install command. Treat `registry/registry.json` as the source manifest and regenerate artifacts after changing it.

## Local development

- Use `npm run dev:docs` for interactive documentation work. It already watches the library output.
- Do not run a second React watcher or `build:react` while it is active.
- Do not run `build:docs` while `dev:docs` is active. Use it only for an explicit production check after stopping the dev workflow.