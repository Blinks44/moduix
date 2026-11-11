---
name: conventions-svelte
description: Use for Svelte JS/TS work in packages/svelte and packages/svelte-tailwind. Prefer Svelte 5 runes components, Ark Svelte contracts, and the shared flat public API.
---

# Svelte Conventions

Use this skill for JS/TS Svelte work in this repo. The adapter targets Svelte 5 with runes only.

## Scope

- Svelte components in `packages/svelte` and `packages/svelte-tailwind`
- local helpers, contexts, snippets, bindable props, and reactive state
- Ark Svelte primitives and factory elements

## Core Rules

- Author components as runes-mode `.svelte` files with `<script lang="ts">`, one public part per
  file. Name the root `<Family>.svelte`, not `<Family>Root.svelte`, and every other part
  `<Family><Part>.svelte`. Do not use legacy syntax: `export let`, `$:`, `<slot>`, `on:event`,
  `createEventDispatcher`, `$$props`, or `$$restProps`.
- Keep component-local `index.ts` files as thin export barrels: `export { default as Accordion }
  from './Accordion.svelte'`, Ark contexts and hooks re-exported by name, and Ark prop and detail
  types re-exported with `export type`, matching the React/Solid/Vue barrel. Export the root under
  the family name and every other part with the family prefix. Do not also export `AccordionRoot`,
  and do not assemble parts into a namespace object. Ark Svelte's `export * as Accordion` namespace
  is not the moduix shape.
- Type `$props()` with the exported Ark Svelte prop type (`AccordionRootProps` from
  `@ark-ui/svelte/accordion`); it already includes `class`, `children`, `asChild`, and `ref`. Add a
  local interface in `<script module lang="ts">` only when the wrapper owns extra props, and export
  it from the barrel; use a private `type Props` in the instance script for a part with no public
  type (for example `AccordionItemBody`, built from `HTMLProps`, `PolymorphicProps`, and
  `RefAttribute` from `@ark-ui/svelte`). Svelte has no runtime prop declarations, so undeclared
  props stay in the rest object and reach Ark untouched with Ark's own defaults. Destructure only
  moduix-owned or intercepted props, such as `class`, `ref`, and bindable values.
- Spread the rest props first, then wrapper-owned attributes: `<AccordionRoot {...props} bind:ref
  bind:value class={...} data-slot="accordion-root" />`. Later attributes win in Svelte, so
  `data-slot` and the merged class always apply; put a consumer-overridable default before the
  spread instead.
- Preserve Ark's bindable contract. Ark parts expose `ref = $bindable(null)`; a wrapper declares
  `ref = $bindable(null)` and passes `bind:ref` to the Ark part so `bind:ref` on the wrapper reaches
  the real host. Do the same for every value Ark declares `$bindable()` (for example the root
  `value`, `open`, or `checked`): declare it bindable and pass `bind:value`. Without that, consumer
  `bind:value` stops at the wrapper. Check the installed Ark source for each part's bindables
  (`grep -n bindable` in `node_modules/@ark-ui/svelte/dist/components/<name>/*.svelte`); besides
  `ref`, Ark binds `value`, `open`, `checked`, `page`, `pageSize`, `zoom`, `rotation`, `flip`,
  `step`, `size`, `position`, `visible`, `view`, `paths`, `acceptedFiles`, `placeholderValue`,
  `highlightedValue`, and `focusedValue` on some parts.
- Pass callbacks as props with Ark's names (`onValueChange`, `onOpenChange`); Svelte 5 has no
  component events. Native DOM listeners are lowercase attributes (`onclick`, `onkeydown`) and fall
  through in the rest props.
- Content is the `children` snippet. A transparent wrapper leaves it in the rest props so the Ark
  part renders it. Destructure `children` only for a moduix default, and render the default in an
  `{#if children}{@render children()}{:else}<ChevronDownIcon />{/if}` branch. Use typed `Snippet`
  props for distinct public roles only, matching the React/Solid/Vue part contract. Do not render an
  empty fallback wrapper when Ark decides its own fallback from the presence of `children`.
- Context components follow Ark Svelte: a `render` snippet receives the context accessor
  (`<AccordionContext>{#snippet render(accordion)}...{/snippet}</AccordionContext>`). Ark contexts
  are getter functions; call `accordion()` inside markup, `$derived`, or effects so reads stay
  reactive. Never store a context result at setup time.
- Use `$derived` for computed values, `$state` for owned local state, and `$effect` only for real
  side effects. Do not mirror props into state through effects.
- Merge classes with `clsx` in CSS Modules (`class={clsx(styles.root, className)}`) and with the
  local `cn` helper in `packages/svelte-tailwind`, consumer class last. Do not use `class:` directives
  or Svelte's object/array class syntax in package source; keep the same merge shape as the other
  adapters.
- Import CSS Modules from the instance script: `import styles from './Accordion.module.css'`.
  Do not add `<style>` blocks to package components; component styles live in the shared
  `*.module.css` files (`conventions-css`).
- Use `$props.id()` when a wrapper needs a generated id, so server and client ids match.
- Keep setup SSR-safe. Access `window`, `document`, layout, and observers only inside `$effect`,
  attachments, or event handlers. Module scope and the component script body run on the server.
- Icons live in `src/internal/icons/ui`: one `.svelte` file per moduix-styled icon (Lucide with
  `aria-hidden`, `focusable`, and the shared stroke width, or a custom SVG) and plain re-exports
  for the rest, all listed in `index.ts` and in the registry `icons` item. Import Lucide by path
  (`@lucide/svelte/icons/chevron-down`) so dev servers do not load the whole icon set. Add a
  missing icon there, mirroring the Vue `Icons.ts` definition.
- Use `@lucide/svelte` and package-local helpers. Never import runtime code or types from another
  framework adapter or from `@ark-ui/react`, `@ark-ui/solid`, or `@ark-ui/vue`.
- Use arrow functions for local helpers and handlers; name internal handlers `handleX`. Keep pure
  logic (types, class utilities, label helpers) in plain `.ts` modules under `src/internal`; files
  that use runes outside a component are `.svelte.ts`.
- In Tailwind components, keep fixed utilities statically discoverable inside the `cn(...)` call of
  the rendered part. An adjacent immutable class-string constant is acceptable for long arbitrary
  selectors. Do not assemble utility names dynamically. A component-local `cva` recipe may own
  prop-driven visual variants.

## Ark Svelte Rules

- Import flat named parts from the component subpath (`import { AccordionRoot, AccordionItem }
  from '@ark-ui/svelte/accordion'`) instead of the `Accordion` namespace. Verify the installed
  exports before writing a wrapper; use `research-upstream-libraries` when behavior is uncertain.
- Ark Svelte does not prefix every part export: `@ark-ui/svelte/dialog` exports `Root`,
  `RootProvider`, `Positioner`, `Title`, and `Trigger` unprefixed. Read the component's
  `index.d.ts` and rename on import (`import { Root as DialogRoot }`).
- Generic collection parts declare `generics="T extends CollectionItem = CollectionItem"` on the
  instance script and pass `T` into the Ark prop type (`SelectRootProps<T>`), like Ark Svelte.
- A Vue `VNodeChild` prop or a React node prop becomes a typed `Snippet` prop. Forward an optional
  snippet as `children={indicator}` so the child part keeps its own default when it is undefined.
- Overlay roots wrap Ark in `OverlayPortalProvider` from `@/lib/moduix/overlayPortal`, or call
  `setOverlayPortalContext` when the root renders its own element; portalled parts render inside
  `OverlayPortal`. Ark's `Portal` mounts content after a tick, so tests await portalled nodes.
- Use `Ark` from `@ark-ui/svelte/factory` for factory elements and keep the same default semantic
  host and supported `as`/host choices as the other adapters.
- `asChild` is a snippet that receives a props function: `{#snippet asChild(props)}<a {...props()}
  href="/x">...</a>{/snippet}`. Keep the child single and semantic. Forward `asChild` through the
  rest props; do not convert it into a Boolean or a React-style element clone.
- Preserve Ark part names, state and data attributes, callback detail objects, ids, and runtime CSS
  variables on every public composition path.
- Ark Svelte versions differ from React/Solid/Vue; parity comes from the shared zag version. Compare
  `@zag-js/core` versions when an Ark behavior differs between adapters.

## Tooling

- The npm package ships Svelte source, not compiled JavaScript: `svelte-package --input src`
  publishes `.svelte` files (keeping `lang="ts"`, as Ark Svelte does), compiled `.ts`, `.d.ts` from
  svelte2tsx, and copies CSS Modules as-is. Consumers compile with their own Svelte version, which
  keeps SvelteKit SSR working. Do not move the package to Rslib or precompile components.
- `svelte.config.js` declares top-level `alias` entries with absolute paths (`@/lib/moduix`, then
  `@`); svelte-package rewrites them to relative imports. Keep the registry aliases in source.
- `scripts/copy-foundation-styles.mjs` copies foundation styles and presets into `dist`
  (`--no-reset` in the Tailwind package). svelte-package's `.svelte-kit/` temp dir is gitignored.
- `tsc:check` runs `svelte-check --fail-on-warnings`; it type-checks `.svelte` markup and scripts.
  Svelte compiler warnings (a11y, unused state) therefore fail the check; fix them instead of
  suppressing them, or add a `svelte-ignore` with the reason for an intentional Ark pattern.
- Tests run through rstest with `@rsbuild/plugin-svelte`, not `@rstest/adapter-rslib`. The config
  disables svelte-preprocess (`preprocess: []`) because it downlevels Ark's `$props()`
  destructuring, sets `compilerOptions.generate` per project, and bundles `@ark-ui/svelte`,
  `@lucide/svelte`, and `@zag-js/svelte` in the Node project. Bundle any new dependency that ships
  `.svelte` files the same way. The Tailwind package runs the CSS Modules package's browser and SSR
  tests against its own source through `@/`; do not copy those tests or fixtures.
- Use `@testing-library/svelte` in Browser Mode. Render with `render(Component, { props })`; for
  snippets, composed parts, and context, render a small `.svelte` harness in
  `tests/<component>/` instead of building snippets in TypeScript. Test `bind:` contracts through a
  harness that binds and displays the value. A component instance does not expose its props, so a
  harness that checks refs keeps them in `$state`, binds them with `bind:ref={rootRef}`, and
  exports `export const getRefs = () => ({ rootRef })` for the test.
- SSR coverage: put one server-renderable fixture per component in `tests/fixtures/Ssr<Name>.svelte`;
  `tests/ssr.test.ts` renders every fixture with `render` from `svelte/server` in the Node project.
  The Browser Mode project compiles only client code, so the Vue-style in-browser hydration test is
  not portable; hydration is checked in a real SvelteKit consumer (starter or one-off build).
- Playground stories are `.stories.svelte` files using `defineMeta` from
  `@storybook/addon-svelte-csf`. Mark every composed story `<Story name="Basic" asChild>`: without
  `asChild` the addon renders the children inside the meta `component`, nesting a second root.
  Name stories with spaces (`"Disabled Item"`) so ids match the React exports
  (`components-accordion--disabled-item`), and keep data, layout, and demo classes identical.
  Shared story data and repeated item lists go in sibling `.ts` and `.svelte` files.
- oxfmt formats `.svelte` (`"svelte": true` in `.oxfmtrc.json`), including Tailwind class sorting in
  `cn(...)`. oxlint checks only the script blocks; template mistakes surface through svelte-check.