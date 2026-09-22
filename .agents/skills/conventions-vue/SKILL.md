---
name: conventions-vue
description: Use for Vue JS/TS work in packages/vue and packages/vue-tailwind. Prefer single-file components with script setup, explicit reactivity boundaries, and composition over configuration.
---

# Vue Conventions

Use this skill for JS/TS Vue work in this repo.

## Scope

- Vue components in `packages/vue` and `packages/vue-tailwind`
- local helpers and handler naming
- reactivity boundaries, context, refs, and slot composition

## Core Rules

- Author components as single-file components (`<script setup lang="ts">` plus a template), one
  component per `.vue` file, mirroring the Ark Vue file layout. Do not add JSX/TSX to the packages.
- One public part per file when a component family exposes multiple parts. Let the `.vue` filename
  provide the inferred component name; use `defineOptions({ name: '...' })` only when the public
  name cannot be inferred correctly.
- Name the public root SFC `<Family>.vue`, not `<Family>Root.vue`, and name every other public part
  `<Family><Part>.vue`. Upstream Ark types such as `AccordionRootProps` keep their upstream names;
  they do not define the moduix value-export shape.
- Keep component-local `index.ts` files as thin export barrels with no component implementation
  logic. Export the root SFC under the family name and every other part with the family prefix, such
  as `Accordion`, `AccordionItem`, `AccordionItemTrigger`, and `AccordionRootProvider`. Do not also
  export `AccordionRoot`. Do not assemble parts with `Object.assign` or a namespace object. Use the
  same flat imports and tags in SFC templates, Storybook runtime templates, tests, npm examples, and
  registry examples.
- Type a transparent Ark wrapper with a local interface that extends the exported Ark Vue prop
  interface through `/* @vue-ignore */`, then pass that interface to `defineProps`. The ignored base
  remains part of the public TypeScript surface but its properties stay in fallthrough attrs at
  runtime, preserving Ark's own Boolean casting and defaults. Do not bind a compiled Ark props
  object back to Ark: an absent optional Boolean would otherwise become `false` before Ark can apply
  a default of `true`.
- Declare only moduix-owned or deliberately intercepted props as local fields on that interface.
  Use Vue 3.5 reactive destructuring with defaults for those local fields, and forward or translate
  them explicitly. Do not intercept an Ark prop merely to restate its upstream behavior.
- Template position controls attribute precedence against `v-bind="attrs"`: a wrapper-owned default
  such as `aria-hidden="true"` goes before `v-bind="attrs"` so consumer attrs can override it, while
  hook attributes such as `data-slot` go after `v-bind="attrs"` so they always win. Vue compiles both
  forms into one `mergeProps` call that keeps template order.
- Never snapshot reactive values outside reactive scopes; read prop and context properties inside
  render, `computed`, and watcher scopes so updates track.
- Use `computed` for derived values instead of manual `watch` where a computed expression is
  clearer.
- Context uses `provide`/`inject` with a typed `InjectionKey` symbol declared in a plain `.ts`
  module next to the components. Expose context values as getter functions or refs, not
  setup-time snapshots, so consumer reads stay reactive.
- Use `class` (never `className`) and kebab-case attributes in templates. When a wrapper controls
  classes or data hooks, call `defineOptions({ inheritAttrs: false })` and bind fallthrough attrs
  exactly once to the public Ark or DOM host. Deliberately declare `class` as a local prop typed as
  `HTMLAttributes['class']` when the wrapper must merge it. In CSS Modules merge that prop last with
  `clsx`; in `packages/vue-tailwind` merge it last with the local `cn` helper. Do not also leave
  `class` inside an object passed through `v-bind`, which would apply the consumer class twice.
  Preserve `style`, ids, ARIA, data attributes, and native listeners through the remaining attrs.
- In a CSS Modules SFC, import the external stylesheet explicitly from `<script setup>` with
  `import styles from './Component.module.css'` and reference classes through `styles.root` in the
  template. This keeps class names visible to IDE CSS Modules tooling and matches the React/Solid
  source pattern. Vue also supports `<style module>` and `$style`, but do not use that form in
  package components or documentation snippets. Plain `.ts` files such as Storybook runtime
  stories use the same normal CSS Module import. Do not add generated CSS typings only to improve
  IDE completion.
- Redeclare required Ark props as local fields and forward them explicitly. This gives `vue-tsc` a
  complete child binding without assertions and keeps requiredness visible in generated
  declarations. Leave optional Ark props, especially optional Booleans with upstream defaults, in
  fallthrough attrs.
- Pass content through `<slot>` outlets without snapshotting slot output in setup. Type every public
  slot with `defineSlots`, including the exact scoped payload exposed by an Ark context part. Use
  the default slot for ordinary component content and add named slots only when the public contract
  has a distinct role.
- Preserve generic collection item types with the SFC `generic` attribute when the Ark component is
  generic. Carry the item type through props, emits, scoped slots, hooks, and exported declarations;
  do not erase it to `any` or a broad record to simplify the export barrel.
- Prefer native Vue primitives where React/Solid use framework portals or context (`Teleport`,
  Vue context). Do not import from `@ark-ui/react` or `@ark-ui/solid`.
- Keep icons and framework helpers Vue-local. Use `@lucide/vue` or existing Vue helpers and never
  import runtime code or types from another framework adapter.
- Omit React-only directives and helpers such as `'use client'`, `cloneElement`, and React context.
  There is no `forwardRef` analog and `ref` is a special template attribute, not an ordinary prop.
  Preserve Vue component-ref semantics and verify the rendered Ark host through `$el`; test the
  ordinary and `asChild` paths separately instead of inventing a React-style ref prop.
- For a transparent Ark event surface, extend the exported Ark Vue emits interface through
  `/* @vue-ignore */` and pass it to `defineEmits`; inherited listeners then remain typed but fall
  through to Ark at runtime. Declare only moduix-owned or intercepted events as local emit members.
  A runtime-declared emit consumes its listener from attrs, so explicitly forward or re-emit it
  once. Never both forward and re-emit the same event.
- Keep Ark-owned `modelValue` and `update:modelValue` on the Ark surface. Do not add `defineModel`
  merely to proxy an existing Ark model, because doing so consumes the prop and event at the
  wrapper boundary. Use `defineModel` only for a genuinely moduix-owned model contract.
- Keep setup and module evaluation SSR-safe. Access `window`, `document`, layout, observers, and DOM
  nodes only behind the appropriate Vue lifecycle or an existing client-safe helper. Components
  using Teleport, generated ids, or browser measurement need an SSR and hydration-oriented check.
- Internal helpers that are pure logic (types, context keys, class utilities) live in plain `.ts`
  modules; components always live in `.vue` files.
- Use arrow functions for local helpers and handlers; use `handleX` for internal handlers and `onX`
  for callback props. In templates use kebab-case listener props such as `@update:model-value`.
- Keep a component's consumer-facing value exports together in the component-local `index.ts`.
- In Tailwind components, keep fixed utilities statically discoverable. Prefer the rendered part's
  `cn(...)` call. An adjacent immutable class-string constant is acceptable when complex arbitrary
  selectors would make a Vue template expression brittle. Do not assemble utility names
  dynamically. A component-local `cva` recipe may own prop-driven visual variants or an identical
  Root/RootProvider recipe.

## Ark Vue Rules

- Import primitives and factory elements from `@ark-ui/vue`, never `@ark-ui/react` or
  `@ark-ui/solid`. Verify current Ark Vue exports before writing a wrapper; use
  `research-upstream-libraries` when behavior is uncertain.
- Use `ark` and `HTMLArkProps` from `@ark-ui/vue/factory` for factory elements; preserve the same
  default semantic host and supported host choices as the React/Solid adapters.
- Preserve Ark part names, state and data attributes, callback detail objects, ids, and runtime CSS
  variables on every public composition path.
- Ark Vue context and state values are refs or computed values. Expose them in the idiomatic Ark
  Vue form while keeping the same names and meaning as the React package.
- Keep `asChild` children single and semantic, mirroring the React/Solid contract. Verify the
  installed Ark Vue factory's `asChild` and `ref` behavior before claiming parity; record any
  unavoidable Ark Vue difference with the component.

## Tooling

- `tsc:check` runs `vue-tsc --noEmit`; keep the repository's JavaScript TypeScript release aligned
  with the installed `vue-tsc` and Vue language tooling. Do not switch this pipeline to the native
  TypeScript build until those tools support it.
- Declarations for `.vue` files are emitted by `unplugin-dts` inside the rslib build and produce
  typed `<Name>.vue.d.ts` files next to the compiled output; keep `cleanVueFileName` disabled so
  `.d.ts` barrels can reference `./Name.vue`.
- Keep the two distribution forms distinct. The npm package ships compiled ESM plus declarations,
  so npm consumers are not required to compile library SFC source. Registry items ship the actual
  native `.vue` files with `<script setup>` and their local `.ts` and style dependencies. Do not
  replace registry SFCs with compiled JavaScript or publish TSX as a Vue source format.
- In Vue component tests, use Vue Testing Library, await event helpers and Vue updates, and verify
  controlled state through a parent harness that writes emitted values back into its ref. Test
  relevant omitted Boolean defaults, fallthrough listeners, scoped slots, ordinary refs through
  `$el`, and `asChild` separately rather than weakening an established behavior assertion.