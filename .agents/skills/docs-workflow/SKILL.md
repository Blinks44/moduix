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

Read [the page-type contract](references/page-types.md) when creating or substantially restructuring a page. It records the shared structure for component, utility, collection, form, guide, and block pages and is the place to add future page types after they are deliberately standardized.

When adding or synchronizing a supported runtime across overview, setup, migration, theme, token,
or component-index pages, read [the framework-support contract](references/framework-support.md).

## Documentation contract

- Document only the shipped public API, except for an explicitly staged adapter branch that will not
  release until framework parity is complete. In that case, document only components already
  implemented and exported by the staged adapter. Remove stale props, examples, styling hooks, and
  guidance in the same task.
- Keep package implementation, public docs, snippets, registry guidance, and supported imports aligned. Teach the recommended path before lower-level composition.
- Use the shared flat public value API in every component page and snippet. Import the family-named
  root, family-prefixed parts, and top-level hooks directly from the component subpath. Do not show
  `Component.Part`, `Component.Root`, namespace imports, or duplicate `<Family>Root` aliases.
- Use public imports from the shipped or explicitly staged package the example documents. Current
  shipped package roots are `@moduix/react`, `@moduix/solid`, `@moduix/vue`, `@moduix/svelte`,
  `@moduix/react-tailwind`, `@moduix/solid-tailwind`, `@moduix/vue-tailwind`, and
  `@moduix/svelte-tailwind`. Discover later adapters from package exports and registries. Live previews run the framework
  selected in the panel with CSS Modules; do not silently present a preview as a different styling
  variant.
- Keep prose and snippets consumer-facing, complete, and production-like. Do not hide required setup, callbacks, collection data, or Ark composition behind docs-only helpers.
- Write the brand as lowercase `moduix`. In public docs, avoid contract wording such as "owns", "owned", and "ownership" (ru "владеет", fr "possède"): say what the part does (manages, controls, renders, handles), and call package versus copied registry source the install method.
- Render every reader-facing package installation, dependency update, executable package, registry CLI, or skill installation command with Rspress `PackageManagerTabs`. Pass a manager-neutral command such as `install <package>` and set `dlx` for temporary executables. Do not hardcode npm, pnpm, Yarn, Bun, or Deno commands in MDX unless manager-specific behavior is the subject of the page.
- Prefer a small local helper to repeated visible ceremony, but never a page builder, hidden DSL, or abstraction that hides the documented composition.
- Keep demo-only styling in the docs app or example CSS module, separate from library styling.
- Write a plain flex or grid demo wrapper as `Stack` with a spacing step (`gap="2"`, which follows the preset) instead of a CSS module class; keep CSS modules for widths, surfaces, and rules that target child parts.
- A component page `description` is one task-first sentence of 50 to 90 characters ("Trigger an
  action or follow a link…"), not a list of frameworks or packages. The same text feeds the
  components index cards, search, and meta tags. Other pages follow `rspress-description-generator`.
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
the current structural and flat-API reference. Use Quick Start only for shared installation and
framework-selection guidance.

## Runnable previews

- Keep runnable component-page examples in `website/src/components/examples/<component>/<name>.tsx`.
- Render a standard component example with `<Example name="<component>/<name>" />`; see the
  [component-page contract](references/component-pages.md). Use explicit `ExampleFrame` markup only for
  nonstandard examples; use Rspress's
  `tsx preview file="../../../src/components/examples/<component>/<name>.tsx"` directive for a
  direct preview.
- Mark source-only `tsx` or `jsx` fences that load code from a file with `pure` before `file=`, as
  in `tsx pure file="..."`. This prevents Rspress from treating the copied source as a live preview.
  Use `preview file=...` only for intentionally rendered previews; never add `pure` to those fences.
- Use `basic.tsx` for the basic path and stable heading-based filenames for subsequent examples.
- Keep a visible snippet self-contained and copyable. Prefer one complete component composition over indirection through hidden helpers.
- Do not add an interactive playground unless the task explicitly requires token editing and the interaction teaches more than static documentation.

Read [preview rules](references/previews.md) whenever adding or changing a preview frame, preview metadata, virtual-file import, or a nontrivial snippet.

## Sidebar and top nav

`website/docs/<locale>/docs/_meta.json` follows the redesign order: Get started, Theming, Components,
Guides, Ark UI, AI. Entries have no `tag` icons and no counts.

- Components lists All components, then one collapsible `custom-link` group per category in
  `website/src/components/docs/component-gallery.tsx`, in the same order. Each component belongs to
  exactly one category; add a new component to the gallery and to its sidebar group together.
- A collapsible group has no `link` of its own: Rspress would then both navigate and toggle on
  click. Put an overview page first inside the group as Overview / Обзор / Vue d’ensemble.
- Links inside `custom-link` groups are absolute and locale-neutral (`/docs/button` in every
  locale): Rspress drops the route prefix of nested relative links but adds the locale prefix itself.
- Keep the three locales structurally identical; only labels differ.
- `website/docs/<locale>/_nav.json` lists every non-component page under `/docs/` in the Docs and
  Components `activeMatch` patterns. Add a new guide page's slug to both patterns in every locale.

## CSS variables and registry docs

- Cover a component's full public `--<component>-*` CSS Modules contract (declared in its CSS Module) in
  `css-properties.tsx` using the shared CSS variables reference UI;
  do not imply that Tailwind mirrors those variables or duplicate the table in prose.
- Keep styling hooks limited to meaningful `className`/`class`, `data-slot`, and state attributes
  that consumers can target. Explain that Tailwind variants use native utility and consumer-class
  overrides, and keep CSS Modules variable guidance on the CSS Modules path.
- Keep the full package and hosted-registry setup, including stylesheets, in `quick-start.mdx`.
  Component pages show a compact Installation block with two tabs: Package (the install command and
  the component's subpath import) and shadcn CLI (registry commands only for the package variants
  that actually ship that component). Do not repeat stylesheet or registry configuration there;
  link to Quick Start instead. Treat each
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
- `website/docs/public/r` is generated and gitignored. Run `pnpm run build:registry` to validate
  every shipped package registry affected by the source change.
- `website/registry.json` owns installable blocks at `/r/blocks`. Blocks reuse native source per
  framework and a shared layout CSS Module across styling tracks; their registry dependencies
  select the matching UI primitives. Use the existing shadcn build, not a separate generator.
- The shadcn CLI does not rewrite Vue SFC imports. Authored SFCs use `@/components/ui/*` for
  installed primitives and `@/lib/moduix/*` for internals; preserve these aliases in Vue setup.

## Local development

- Use `pnpm run dev:docs` for interactive documentation work. It already watches the library output.
- Do not run another package watcher or clean package build while it is active.
- Do not run `build:docs` while `dev:docs` is active. Use it only for an explicit production check after stopping the dev workflow.