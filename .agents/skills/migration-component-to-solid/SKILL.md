---
name: migration-component-to-solid
description: Port an established moduix component into the native Solid CSS Modules and Tailwind adapters, including tests, playground stories, exports, and registries, while preserving the shared contract and Solid-specific behavior.
---

# Component Migration to Solid

Port one established component into both Solid styling tracks as one task:

- `packages/solid` for CSS Modules;
- `packages/solid-tailwind` for Tailwind;
- `playgrounds/solid` and `playgrounds/solid-tailwind` for matching stories.

Use `component-workflow` for the shared contract and synchronization surfaces. Use
`conventions-css`, `research-upstream-libraries`, and `rstest-best-practices` for their respective
technical surfaces. This skill owns native Solid translation and replaces the previous
React-specific migration workflow.

## Sources of truth

Read every established implementation in both styling tracks, together with its tests, stories,
exports, registry items, local markdown, helpers, icons, and dependencies. React is usually the
initial implementation, but it is evidence for the shared contract rather than Solid source code.
When another shipped adapter exists, use agreement across shipped adapters to distinguish the
framework-neutral contract from runtime mechanics.

If shipped adapters disagree, resolve the difference from documentation, behavior tests, current
Ark behavior, and public usage before writing Solid. Report an unresolved or out-of-scope shipped
bug instead of copying it silently.

Read the current Ark Solid component page or guide and inspect installed exports whenever an Ark
primitive, factory, provider, context, ref, presence behavior, callback contract, or generic
collection is involved. Do not infer Ark Solid from another adapter or recreate missing Ark
internals.

Port direct component dependencies first. Keep framework source local to the Solid package and use
`packages/foundation` only for existing shared styles, tokens, animations, resets, and presets.

## Contract to preserve

Keep semantically equivalent:

- component names, namespace parts, hooks, contexts, providers, and package subpath exports;
- props, defaults, controlled and uncontrolled state, callback details, and lifecycle;
- DOM anatomy, semantic hosts, ARIA, keyboard behavior, focus, forms, and hidden controls;
- Ark data attributes, public `data-slot` hooks, ids, presence, and runtime variables;
- visual defaults, responsive behavior, animation, and reduced motion;
- children, refs, `asChild`, portals, context composition, and lazy mounting.

Framework mechanics remain native. Solid may use `class`, accessors, render-function context, and
Solid refs where another adapter uses different syntax. Do not add compatibility aliases merely to
make implementations textually identical.

## Native Solid implementation

- Import primitives and factory elements from `@ark-ui/solid`, never another Ark adapter.
- Use plain Solid components. Do not reproduce React `forwardRef`; pass the Solid `ref` prop through
  according to the target Ark or intrinsic element contract.
- Preserve prop reactivity. Do not destructure props; use `splitProps`, `mergeProps`, or direct
  property access when values may change.
- Merge the consumer `class` with the local CSS Module class or Tailwind defaults. In Tailwind, use
  the package-local `cn` helper and keep the consumer class last.
- Resolve `children` with Solid's `children` helper only when a wrapper must inspect, default, or read
  children more than once. Do not eagerly evaluate reactive children.
- Use Solid JSX and types for refs, events, and `style`. Omit React-only directives, helpers, and
  contexts.
- Preserve the established namespaced component object with the smallest native construct.
- Keep helpers and icons Solid-local and port only direct requirements.

## Ark primitives, factory parts, and context

Map every public primitive part to the matching Ark Solid part. Verify roots, root providers,
contexts, hooks, part props, emit or callback detail types, and state values independently.

Do not translate state-machine values, scan children, emulate providers, or remove Ark-owned hidden
controls, ids, positioning, measurements, presence, or runtime variables. Solid context values may
be accessors; expose them in the idiomatic Ark Solid form while preserving their meaning.

For factory components, use `ark` and `HTMLArkProps` from `@ark-ui/solid/factory`. Preserve the
default semantic host, supported host choices, `asChild`, data hooks, variants, and style behavior.
Verify ordinary refs and `asChild` independently. Preserve an upstream limitation rather than
wrapping, reinjecting, or composing refs to disguise it.

## CSS Modules and Tailwind

For CSS Modules, start from the established module without semantic changes. Keep selectors,
tokens, public variables, animations, and fallbacks aligned. The module lives beside the Solid
component and is never imported across framework package boundaries.

For Tailwind, port the mature Tailwind contract rather than retranslating CSS Modules. Preserve
utility ownership, `cva` variants, state sources, runtime variables, consumer-last class merging,
and static discoverability. Use `migration-css-modules-to-tailwind` only if no established Tailwind
counterpart exists and the task genuinely includes style translation.

A framework-specific style difference is allowed only when emitted Solid DOM or behavior genuinely
differs, and the reason must be recorded with the component.

## Tests and stories

Port established behavior tests assertion-for-assertion using Solid testing utilities. Adapt only
framework mechanics. Cover public anatomy, semantics, ARIA, keyboard and focus, callbacks, forms,
context, providers, presence, refs, `asChild`, data hooks, consumer class merging, and Tailwind
override behavior where applicable.

Create scenario-equivalent native Solid stories in both Solid playgrounds. Keep titles, exported
story names, controls, scenario data, states, layout, and demo styling aligned. Do not share story
implementations across runtimes or omit a scenario because a dependency has not been ported.

Build both playgrounds and compare them with the established CSS Modules and Tailwind scenarios in
a browser. A passing unit test or a class token in the DOM does not prove visual parity.

## Exports and registry distribution

For both Solid packages:

- add a re-export-only component `index.ts` and an alphabetical package subpath export;
- add only direct runtime dependencies used by that implementation;
- add a package-owned registry item with Solid source paths and Solid dependencies;
- depend only on the matching Solid `foundation`, `cn`, icons, helpers, and component items;
- never depend on a React, Vue, or other framework registry item.

Run `pnpm run build:registry` after registry source changes and inspect the generated Solid items.
Never edit `website/docs/public/r` manually.

## Per-component workflow

1. Inventory the established contract across both styling tracks and establish dependency order.
2. Resolve shipped-adapter differences and verify the current Ark Solid API.
3. Implement the native Solid CSS Modules component and local module.
4. Implement the native Solid Tailwind component from the established Tailwind contract.
5. Port behavior tests to both packages without weakening assertions.
6. Port the complete story set to both Solid playgrounds and compare it in a browser.
7. Add exports, dependencies, and registry items after implementation and declarations build.
8. Generate registries when changed and finish the validation required by `AGENTS.md`.

## Completion

A Solid migration is complete only when both styling tracks exist; no foreign runtime or type
imports remain; public behavior, accessibility, anatomy, states, and visual defaults match the
established contract; tests and stories are equivalent; package and declaration builds pass;
registry items are Solid-native; and repository validation passes.

Report every deferred dependency, unresolved shipped-contract conflict, unsupported Ark Solid
feature, or intentional framework difference. Do not describe a one-track or partially verified
port as complete.