---
name: docs-workflow
description: Maintain localized Rspress documentation, including page-type structure, multi-framework support, setup guides, runnable examples, CSS-variable references, and registry guidance.
---

# Docs Workflow

Own consumer-facing documentation in `website` across every configured locale. Keep it truthful to the shipped package and easy to use; prefer the smallest complete example over a configurable demo.

This skill owns documentation content and source-to-locale consistency. It does not own Rspress configuration, theme customization, translation implementation, or description-frontmatter work. Apply the corresponding focused skill when that surface changes, especially `rspress-localization` for any localized content.

## Read first

1. `AGENTS.md` and the affected MDX page.
2. The corresponding default-language page (currently English) and the affected locale pages. Use `rspress-localization` for the translation itself.
3. The shipped component API, its local markdown, and its existing examples when the page documents a component.

Read [the page-type contract](references/page-types.md) when creating or substantially restructuring a page. It records the shared structure for component, utility, collection, form, guide, and recipe pages and is the place to add future page types after they are deliberately standardized.

When adding or synchronizing a supported runtime across overview, setup, migration, theme, token,
or component-index pages, read [the framework-support contract](references/framework-support.md).

## Documentation contract

- Document only the shipped public API, except for an explicitly staged adapter branch that will not
  release until framework parity is complete. In that case, document only components already
  implemented and exported by the staged adapter. Remove stale props, examples, styling hooks, and
  guidance in the same task.
- Keep package implementation, public docs, snippets, registry guidance, and supported imports aligned. Teach the recommended path before lower-level composition.
- Use public imports from the shipped or explicitly staged package the example documents. Current
  shipped package roots are `@moduix/react`, `@moduix/solid`, `@moduix/react-tailwind`, and
  `@moduix/solid-tailwind`. The staged Vue roots are `@moduix/vue` and `@moduix/vue-tailwind` and may
  appear only for components already implemented in those packages. Discover later adapters from
  package exports and registries. The documentation application runs React; do not silently present
  its live preview as a different runtime or styling variant.
- Keep prose and snippets consumer-facing, complete, and production-like. Do not hide required setup, callbacks, collection data, or Ark composition behind docs-only helpers.
- Render every reader-facing package installation, dependency update, executable package, registry CLI, or skill installation command with Rspress `PackageManagerTabs`. Pass a manager-neutral command such as `install <package>` and set `dlx` for temporary executables. Do not hardcode npm, pnpm, Yarn, Bun, or Deno commands in MDX unless manager-specific behavior is the subject of the page.
- Prefer a small local helper to repeated visible ceremony, but never a page builder, hidden DSL, or abstraction that hides the documented composition.
- Keep demo-only styling in the docs app or example CSS module, separate from library styling.
- When changing reader-facing prose in a locale page, load `rspress-localization` and complete its
  target-language review before finishing. A literal but awkward translation is not complete
  documentation.

## Cross-locale page consistency

When editing localized pages, also use `rspress-localization`. Treat the default-language
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

When adding a framework adapter to an existing component page, treat the work as a component-page
migration: keep the existing example coverage, add native source for the new framework to every
applicable example, simplify the explanatory structure, and update every locale. Use Accordion as
the current page reference; use Quick Start only for shared installation and framework-selection guidance.

## Runnable previews

- Keep runnable component-page examples in `website/src/components/examples/<component>/<name>.tsx`.
- Render an imported example with `ExampleFrame` when the page also shows its source; use Rspress's
  `tsx preview file="../../../src/components/examples/<component>/<name>.tsx"` directive for a
  direct preview.
- Mark source-only `tsx` or `jsx` fences that load code from a file with `pure` before `file=`, as
  in `tsx pure file="..."`. This prevents Rspress from treating the copied source as a live preview.
  Use `preview file=...` only for intentionally rendered previews; never add `pure` to those fences.
- Use `basic.tsx` for the basic path and stable heading-based filenames for subsequent examples.
- Keep a visible snippet self-contained and copyable. Prefer one complete component composition over indirection through hidden helpers.
- Do not add an interactive playground unless the task explicitly requires token editing and the interaction teaches more than static documentation.

Read [preview rules](references/previews.md) whenever adding or changing a preview frame, preview metadata, virtual-file import, or a nontrivial snippet.

## Sidebar icons

- Treat each `tag` in `website/docs/<locale>/docs/_meta.json` as a semantic icon for its sidebar entry.
- Reuse an existing mapping from `website/theme/components/Tag/index.tsx` only when it accurately represents the page. Do not use an unrelated icon merely to avoid changing the shared set.
- If the set has no suitable icon, add the appropriate named Lucide icon to the shared `Tag` mapping, then use the new tag consistently in every locale.
- Keep tags in parity between locales. Repeated icons are appropriate for truly equivalent concepts, such as individual components, but review accidental repeats when editing a sidebar.

## CSS variables and registry docs

- Cover a component's full public `--<component>-*` CSS Modules contract from
  `packages/foundation/src/styles/variables-moduix.css` using the shared CSS variables reference UI;
  do not imply that Tailwind mirrors those variables or duplicate the table in prose.
- Keep styling hooks limited to meaningful `className`/`class`, `data-slot`, and state attributes
  that consumers can target. Explain that Tailwind variants use native utility and consumer-class
  overrides, and keep CSS Modules variable guidance on the CSS Modules path.
- Keep the full package and hosted-registry setup in `quick-start.mdx`; do not repeat a generic
  `Install as a package` section on every component page because it duplicates Quick Start and adds
  no component-specific information. Component pages show only the relevant shadcn registry commands
  for package variants that actually ship that component. Treat each
  `packages/<variant>/registry.json` as its source manifest. Shared
  styles and presets come from `packages/foundation/registry.json` through `/r/foundation` URL
  dependencies; the reset applies only to CSS Modules variants because Tailwind uses Preflight.
- In Quick Start, present CSS Modules and Tailwind as equal styling paths with the shared
  `groupId="styling"` tabs. Keep install commands, required stylesheet setup, and the first usable
  example inside the selected path instead of appending Tailwind as a later exception. Use a
  component that actually ships in every documented runtime and styling variant; currently Accordion
  fulfills that role.
- Quick Start and framework setup guides start from an existing application with its runtime already
  configured; a Tailwind path also assumes Tailwind CSS v4 is configured. Do not scaffold a project
  or reinstall framework runtimes or `tailwindcss`. Keep the matching Ark UI peer explicit in package
  commands so the instructions work consistently across npm, pnpm, Yarn, and Bun.
- Never edit `website/docs/public/r` by hand. Run `pnpm run build:registry` and keep generated output
  for every shipped package registry affected by the source change.

## Local development

- Use `pnpm run dev:docs` for interactive documentation work. It already watches the library output.
- Do not run another package watcher or clean package build while it is active.
- Do not run `build:docs` while `dev:docs` is active. Use it only for an explicit production check after stopping the dev workflow.