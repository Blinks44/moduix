---
name: migration-component-to-vue
description: Port an established moduix component into the native Vue CSS Modules and Tailwind adapters, including tests, playground stories, exports, and registries, while preserving the shared contract and Vue-specific behavior.
---

# Component Migration to Vue

Port one established component into both Vue styling tracks as one task:

- `packages/vue` for CSS Modules;
- `packages/vue-tailwind` for Tailwind;
- `playgrounds/vue` and `playgrounds/vue-tailwind` for matching stories.

Use this skill with `component-workflow`, `conventions-vue`, `conventions-css`,
`research-upstream-libraries`, and `rstest-best-practices`. Use `rslib-best-practices` only when
the package build or declaration pipeline itself changes.

This is a framework-adapter migration, not a new CSS Modules-to-Tailwind translation. The mature
React and Solid Tailwind implementations already define the Tailwind styling contract. Use
`migration-css-modules-to-tailwind` only when no established Tailwind counterpart exists and the
task actually requires translating styles.

Vue is an in-development adapter, not a shipped contract. Completing one component does not
authorize publishing the Vue packages, changing public website availability claims, or treating
all incomplete Vue counterparts as required impact work.

## Establish the contract before writing Vue

Read the component across the complete established matrix:

- React CSS Modules implementation, module, tests, story, local markdown, export, and registry item;
- Solid CSS Modules implementation, module, tests, story, export, and registry item;
- React and Solid Tailwind implementations, tests, stories, exports, and registry items;
- direct moduix dependencies, local helpers, icons, foundation tokens, and generated artifacts that
  reveal the distribution contract.

Treat agreement between the shipped adapters as the framework-neutral contract. React is not the
Vue source code and Solid is not the Vue source code. They are independent evidence for public
names, behavior, anatomy, accessibility, and visual defaults.

If React and Solid differ, do not choose the easier implementation or combine both accidentally.
Resolve the difference from component-local documentation, behavior tests, current Ark behavior,
and existing public usage. Classify it as an intentional framework difference, a shipped bug, or an
unresolved contract conflict. Report a conflict before reproducing it in Vue; fix shipped adapters
only when the user's scope authorizes that work.

Record before implementation:

- public component and part names, namespace shape, hooks, contexts, providers, and subpath export;
- props, defaults, controlled and uncontrolled state, callbacks or events, and lifecycle;
- DOM anatomy, semantic hosts, forms, ARIA, keyboard behavior, focus, ids, and presence;
- `data-scope`, `data-part`, public `data-slot`, state attributes, and runtime CSS variables;
- slot and `asChild` behavior, refs, portals, responsive behavior, and reduced motion;
- CSS Module selectors, Tailwind utilities, visual states, and every story scenario;
- direct component dependencies and the order in which their Vue adapters must exist.

Port dependencies first. Do not hide a missing Vue dependency behind a React or Solid import, a
cross-package source import, or a local one-off replacement.

## Verify the actual Ark Vue surface

Read the current official Ark UI page or guide for the component and inspect the installed
`@ark-ui/vue` exports and declarations before implementing. Verify Vue independently for:

- primitive part names and semantic hosts;
- root props, defaults, emits, `modelValue`, and `update:modelValue`;
- `RootProvider`, `use*`, `use*Context`, and scoped `Context` slots;
- `asChild`, factory types, refs, presence, lazy mounting, portals, and callback detail objects;
- generic collections, item state, and component-specific runtime CSS variables.

Do not infer Ark Vue from Ark React or Ark Solid. Do not rebuild an Ark state machine, translate its
events manually, scan children to discover parts, or emulate a missing primitive. If Ark Vue lacks
a required capability, stop that component at a truthful partial boundary and report the upstream
gap.

Use component subpath imports such as `@ark-ui/vue/<component>` and factory imports from
`@ark-ui/vue/factory` when those are the installed public exports. Never import React or Solid
runtime code or types into a Vue package.

## Translate the contract into native Vue

Follow `conventions-vue`. In particular, author package components as single-file components with
`<script setup lang="ts">` and a template, one public part per `.vue` file, mirroring the Ark Vue
file layout. Do not add JSX/TSX, React compatibility layers, generated sources, or a shared
cross-framework component runtime.

### Props, attrs, and reactivity

- Type a transparent primitive wrapper with a local interface extending
  `/* @vue-ignore */ ArkPartProps`, then pass it to `defineProps`. This keeps the inherited Ark props
  in the public TypeScript surface while leaving them in fallthrough attrs at runtime. Do not
  translate React `ComponentProps`, add `PropType` declarations, or manually restate the upstream
  interface.
- Do not compile the complete Ark prop interface into wrapper runtime props and bind it back to Ark.
  Vue casts an absent optional Boolean prop to `false`, which would override any Ark default of
  `true`. Let Ark own its casting and defaults.
- Declare only moduix-owned or deliberately intercepted props as local interface fields. Use Vue
  3.5 reactive destructuring with defaults for those fields, then forward or translate them
  explicitly. Do not intercept an Ark prop merely to restate upstream behavior.
- Preserve Ark defaults by leaving them with Ark. Add a wrapper default only when moduix owns a
  different documented default.
- Treat the object returned by `useAttrs()` as the current fallthrough surface for undeclared HTML
  attributes, `class`, `style`, `aria-*`, `data-*`, and listeners. Do not destructure it or snapshot
  its values during setup.
- When a wrapper merges classes, adds an owned data hook, redirects attrs, or renders more than one
  root, call `defineOptions({ inheritAttrs: false })` and bind attrs explicitly to the public host.
  Ensure attrs are forwarded exactly once.
- When merging classes, deliberately redeclare `class?: HTMLAttributes['class']` as a local prop,
  merge it last, and bind only the remaining fallthrough attrs. Do not both pass an attrs object
  containing `class` and bind a merged `:class`, because that applies the consumer class twice.
  Forward consumer `style`, ids, ARIA, data attributes, and native listeners unchanged. Place owned
  `data-slot` hooks so a consumer cannot accidentally replace them.
- When a required Ark prop intentionally stays in fallthrough attrs, `vue-tsc` cannot infer it from
  the generic `Attrs` type at the child template boundary. Preserve the live proxy and narrow only
  that binding with `useAttrs() as unknown as ArkPartProps`. Never use the cast to hide a genuinely
  missing required prop, and do not compile the prop locally merely to satisfy the template checker.
- Do not use a watcher to mirror a prop into local state. Use `computed`, a getter, or the Ark Vue
  controlled-state API. Use local refs only for state genuinely owned by the wrapper.

### Events and v-model

Use the native Ark Vue event contract. A semantic match does not require React callback prop names
to appear in Vue.

- Preserve Ark Vue event names and payload objects, including native `modelValue` and
  `update:modelValue` support where provided.
- Do not wrap an existing Ark model with `defineModel`: it consumes the prop and event at the wrapper
  boundary and changes transparent forwarding. Use `defineModel` only when moduix deliberately owns
  a distinct model contract.
- Do not invent `onValueChange` props merely because React exposes a callback. Vue listeners are
  derived from component emits, so a declared emit becomes `@event-name` in templates.
- For a transparent event surface, extend `/* @vue-ignore */ ArkPartEmits` in a local interface and
  pass it to `defineEmits`. This preserves consumer typing while leaving inherited listeners in
  attrs for Ark.
- If the wrapper locally declares or intercepts an event, Vue removes its listener from fallthrough
  attrs. The wrapper must then forward or re-emit that event deliberately.
- Never both forward a listener and re-emit the same upstream event, which can notify the consumer
  twice.
- Keep controlled examples controlled: update the parent ref from the emitted value. Do not mutate
  readonly props or claim controlled behavior from an uncontrolled-only test.

### Slots, contexts, and providers

- Translate React or Solid children into Vue slots. Forward content through `<slot>` outlets without
  evaluating or snapshotting slot output in setup, so conditionals and reactive values update.
- Type every public slot with `defineSlots`. Preserve the exact scoped payload for Ark context and
  item-state slots so consumer templates retain inference.
- Use the default slot for ordinary content and named or scoped slots only when the established
  component contract has a corresponding role.
- Re-export Ark Vue context components and hooks when they are public counterparts. Ark Vue
  `Context` components expose state through scoped slots; do not convert them into React-like render
  props or setup-time snapshots.
- For moduix-owned context, use `provide` and `inject` with a typed `InjectionKey`. Store refs,
  computed values, or getters in context so consumers observe updates.
- Preserve `Root` and `RootProvider` as separate composition paths. Do not mount both around the same
  state instance unless Ark Vue explicitly requires it.

### Generic component families

For collection-driven components such as Select, Combobox, Listbox, Tree View, and menus with typed
items, preserve the item generic rather than replacing it with `any`.

- Use the SFC `generic` attribute on every public part that carries the item type.
- Carry the generic through collection props, item props, emits, context hooks, scoped slots, and
  exported component declarations.
- Build the package and compile a small consumer fixture that uses a non-trivial item type. Verify
  both valid inference and one expected type error. A declaration file that silently widens the
  item to `any` is a failed port even when the package build succeeds.

### Refs, asChild, and semantic hosts

Vue component refs are native component public instances. Ark Vue exposes the rendered element as
`$el`; this is not React ref forwarding.

- Do not add a `ref` prop or a React-style forwarding helper merely for textual parity.
- Preserve the Ark Vue ref shape and verify that a ref on each public wrapper resolves to the
  intended host through `$el`.
- Test the ordinary host and `asChild` separately. With `asChild`, pass exactly one semantic child
  and verify which element receives attrs, behavior, classes, and the public ref.
- Do not wrap an `asChild` child, clone VNodes, or reconstruct slots to force an unsupported ref
  combination. Record an unavoidable Ark Vue limitation instead.
- Keep the same default semantic host and form semantics as the established contract. If a label,
  button, input, or hidden control is required for accessibility, do not replace it with a generic
  element for easier component typing.

### Primitive, factory, and local components

For Ark primitive wrappers, map each established public part to the matching Ark Vue part. Preserve
native root providers, context hooks, presence, hidden controls, ids, and callback detail objects.

For factory components, use `ark` and `HTMLArkProps` from `@ark-ui/vue/factory`. Preserve the default
host, supported host choices, `asChild`, data hooks, style fallthrough, and variant behavior. Avoid a
generic polymorphic helper when a small explicit host map is clearer and better typed.

For local compositions, use Vue `computed`, refs, `provide`/`inject`, and `Teleport` where those are
the native equivalent. Reuse the package-local overlay portal helper when the established component
uses that contract. Do not import helpers from another framework package.

Keep module evaluation and setup SSR-safe. Browser globals, DOM nodes, observers, and layout reads
must stay behind Vue lifecycle hooks or an existing client-safe helper. For components using
Teleport, generated ids, presence, or browser measurement, add a focused server-render smoke test
and check that client hydration does not change public anatomy or ids.

Keep icons Vue-local with `@lucide/vue` or existing Vue icon helpers. Preserve accessible SVG output
and port only icons required by the component or an already-ported dependency.

## Implement both styling tracks

### CSS Modules

Start from the established CSS Module and keep its selectors, tokens, variables, animations, and
fallbacks aligned. The Vue module must live beside the Vue component and must not be imported from
React or Solid.

Merge the local class with the consumer `class` through `clsx`, consumer last. A CSS difference is
allowed only when Vue emits genuinely different DOM or state hooks, and that difference must be
documented with the component.

### Tailwind

Port the classes from the mature React and Solid Tailwind implementations. Use the package-local
`cn` helper and keep the consumer class last. Preserve static discoverability, `cva` variants,
runtime state variants, logical properties, animation, and reduced-motion behavior.

Do not retranslate the CSS Module, copy CSS customization variables into Tailwind, or change class
ownership merely because Vue syntax differs. If the two mature Tailwind implementations disagree,
resolve that contract conflict before choosing Vue classes.

For both tracks, preserve Ark runtime variables and `data-*` state sources. Compare the rendered Vue
DOM, not just source strings, because slot and `asChild` mechanics can change where a class lands.

## Tests

Create framework-native tests in both Vue packages. Port the established behavioral assertions, not
their React or Solid testing syntax.

Cover the applicable contract:

- public parts, default anatomy, semantic hosts, data hooks, ARIA, and hidden form controls;
- controlled and uncontrolled state, Vue emits, `v-model`, callback payloads, and rerender behavior;
- inherited Ark props and listeners reaching the primitive exactly once without wrapper coercion;
- omission and explicit `false` for every relevant Ark Boolean whose upstream default is `true`;
- keyboard, focus, disabled, readonly, required, invalid, orientation, and presence behavior;
- default slots, named or scoped slots, default content, contexts, providers, and portals;
- ordinary refs through `$el`, plus the separate `asChild` path;
- consumer class and attr forwarding in CSS Modules and conflicting utility replacement in Tailwind.

Use Vue Testing Library and await Vue updates with the framework's normal async boundary when state
or props change. For controlled state, use a small Vue harness that writes emitted values back into
the controlling ref. Clean up Teleport targets and timers owned by the test.

Await Vue Testing Library `fireEvent` calls. In happy-dom, Ark or Zag pointer activation may require
the same focus sequence as the shipped tests: focus the trigger, dispatch `focusIn`, wait for
`data-focus`, then click. Do not misdiagnose a missing test focus transition as broken Vue state.

Do not weaken a shipped assertion because the first Vue implementation fails it. Do not snapshot
complete class strings. A real Ark Vue difference should have a focused test and an explicit handoff
note.

## Playground stories

Create scenario-equivalent stories in both Vue playgrounds. Keep the established title, exported
story names, controls, scenario data, states, and demo layout. Use SFC or template-based Vue
Storybook components with native refs, computed values, slots, and event listeners; do not restore
TSX through the playgrounds.

Runtime `template` strings do not receive `<script setup>` binding metadata and therefore cannot
resolve namespace-property tags such as `<Accordion.Item>`. Import the individually exported parts,
register them on the story or test component, and use local tags such as `<AccordionItem>`. Keep the
package namespace export for compiled consumer SFCs and JavaScript composition.

Keep CSS Modules demo styles local to the Vue story. Translate the matching demo presentation to
small static Tailwind strings in the Tailwind story. Do not share story components across framework
playgrounds or omit a scenario because its dependency is missing. Normally port the dependency
first. During adapter bootstrap, when the user explicitly selects the first component and a story
depends only for demonstration on an unported moduix component, preserve the story name and purpose
with a small native Vue or platform control. Keep that substitute out of package source and
registries, report it, and replace it once the dependency is ported. Never use this exception for a
runtime dependency or public API.

Build both Vue playgrounds and compare them against the established CSS Modules and Tailwind
scenarios in a browser. Verify interaction, focus, portals, responsive behavior, animation,
reduced-motion behavior, and visible empty decorative parts where relevant.

## Exports and registry distribution

For both Vue packages:

- add a thin component `index.ts` that only assembles and exports the root, namespaced SFC parts,
  hooks, and public types;
- add the package subpath export in alphabetical order;
- add only direct runtime dependencies actually used by the Vue implementation;
- add a package-owned registry item with Vue source paths and Vue dependencies;
- use the Vue registry namespaces and the target package's existing `foundation`, `cn`, `icons`,
  `overlay-portal`, and component dependencies;
- never depend on an `@moduix-react/*` or `@moduix-solid/*` registry item.

The two consumer paths have different artifacts and both must remain native:

- npm consumers load compiled ESM and `.vue.d.ts` declarations and must not need an SFC compiler for
  library internals;
- registry consumers receive the authored `.vue` SFCs with `<script setup lang="ts">`, plus every
  directly imported `.ts` helper and CSS Module file. Generated registry targets must retain `.vue`
  filenames and must not contain JSX, TSX, or compiled render functions.

Keep registry files inside their owning package. Run `pnpm run build:registry` after source registry
changes and inspect the generated Vue and Vue Tailwind items. Never edit `website/docs/public/r`
manually. If registry generation does not yet support the Vue target, report that infrastructure
gap instead of fabricating generated artifacts.

Do not remove `private: true`, publish the packages, or update public installation documentation as
part of an ordinary component port. Those are adapter-release decisions.

## Per-component workflow

1. Inventory the four established implementations and all synchronization surfaces.
2. Resolve React/Solid contract differences and establish Vue dependency order.
3. Verify current Ark Vue docs, installed exports, prop and emit types, slots, refs, and `asChild`.
4. Implement the Vue CSS Modules component with native Vue reactivity and local styles.
5. Implement the Vue Tailwind component from the established Tailwind contract.
6. Port behavior tests to both packages, including Vue-specific emits, controlled state, slots, and
   ref behavior.
7. Port the complete story set to both Vue playgrounds and compare it in a browser.
8. Add exports, runtime dependencies, and registry items after implementation and declarations
   build.
9. Re-run the component impact check, generate registries when changed, and finish the validation
   required by `AGENTS.md`.

## Completion

A Vue component migration is complete only when:

- both Vue styling tracks exist and neither imports React or Solid runtime code or types;
- the namespace, public parts, semantic behavior, accessibility, states, and visual defaults match
  the established contract;
- Vue props, attrs, emits, `v-model`, slots, contexts, refs, `asChild`, and portals behave natively;
- both Vue test suites contain equivalent behavioral coverage and pass;
- both Vue playgrounds contain the complete matching scenario set and pass browser comparison;
- package exports and declaration output expose usable Vue-native types;
- generic component declarations preserve consumer item inference without widening to `any`;
- browser-sensitive components pass the applicable SSR render and hydration-oriented checks;
- npm output contains working compiled ESM and `.vue.d.ts` references, while registry items contain
  authored `.vue` SFCs plus all direct Vue-native dependencies; generated artifacts are verified
  when generation supports them;
- focused package builds and Storybook builds pass;
- `pnpm run fmt:fix`, `pnpm run lint:check`, and `pnpm run tsc:check` pass from the repository root.

Report every deferred dependency, unresolved shipped-contract conflict, unsupported Ark Vue
feature, intentional Vue difference, or unavailable registry surface. Do not describe a one-track
or partially verified port as complete.