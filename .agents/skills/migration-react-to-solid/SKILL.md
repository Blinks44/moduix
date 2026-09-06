---
name: migration-react-to-solid
description: Port and synchronize moduix components from React to native Solid in either the CSS Modules or Tailwind package pair while preserving public and behavioral contracts.
---

# React to Solid Migration

Port a shipped React component as a native Solid adapter without introducing a shared component
runtime, generated TSX, or React-compatibility layer. Use `packages/react` → `packages/solid` for the
CSS Modules track and `packages/react-tailwind` → `packages/solid-tailwind` for the Tailwind track.

## Sources of truth

Read the React component, test, matching playground story, exports, registry item, and internal
dependencies. For the CSS Modules track, also read its module and local markdown. For the Tailwind
track, read the CSS Modules implementations in both runtimes to distinguish styling translation
from framework translation. Treat shipped code and tests as the executable contract. When
synchronizing an existing port, read the Solid implementation and tests before editing.

Read the current Ark Solid component page or guide whenever an Ark primitive, factory, provider,
context, ref, presence behavior, or callback contract is involved. Do not infer the Solid API from
the React package. If Ark Solid lacks a required primitive or surface, stop and report the gap instead
of recreating Ark internals.

Use `packages/foundation` as the existing cross-framework source. Do not move component JSX, CSS
Modules, icons, or framework-specific helpers into foundation as part of an ordinary port.

When the port is ready for copy-owned distribution, add it to the matching Solid registry. Keep
source paths inside that package, use its `@moduix-solid/*` or `@moduix-solid-tailwind/*` registry
namespace, and port every direct component dependency first.

## Parity contract

Keep these equivalent to the React component:

- component names, callable roots, namespaced parts, hooks, contexts, and package subpath exports;
- props, defaults, controlled and uncontrolled state, callback detail objects, and lifecycle;
- DOM anatomy, semantic hosts, ARIA, keyboard behavior, focus management, and native form behavior;
- `data-scope`, `data-part`, `data-slot`, state attributes, ids, and runtime CSS variables;
- visual defaults, responsive behavior, mount and unmount animation, and reduced-motion behavior;
- `asChild`, refs, providers, context composition, lazy mounting, and presence where exposed.

Framework mechanics should remain native. Solid may use `class`, accessors, render-function context,
and Solid refs where React uses `className`, values, hooks, and `forwardRef`. Do not add aliases or
adapters merely to make those mechanics textually identical.

## Solid implementation rules

- Import primitives and factory elements from `@ark-ui/solid`, never `@ark-ui/react`.
- Use plain Solid components. Do not reproduce React `forwardRef`; pass the Solid `ref` prop through
  according to the target Ark or intrinsic element contract.
- Preserve prop reactivity. Do not destructure reactive props; use `splitProps`, `mergeProps`, or
  direct property access when values may change.
- Merge the consumer `class` with the local CSS Module class or Tailwind defaults. In a Tailwind
  package use its local `cn` helper and keep the consumer class last.
- Resolve `children` with Solid's `children` helper only when the wrapper must inspect, default, or
  read children more than once. Do not eagerly evaluate reactive children.
- Use Solid JSX and style types for refs, events, and `style`. Preserve public CSS custom-property
  overrides when adding an internal style fallback.
- Omit React-only directives and helpers such as `'use client'`, `cloneElement`, and React context.
- Preserve the callable and namespaced public shape with the smallest native construct; keeping the
  established `Object.assign(Root, { Root, ...parts })` shape is acceptable.
- Keep icons framework-local and reproduce the same SVG output. Port only the icons required by the
  component and its already-ported dependencies.

## Ark primitive components

Replace each React primitive part with the corresponding Ark Solid part. Verify the current Solid
exports for roots, root providers, contexts, hooks, part props, and detail types before writing the
wrapper.

Preserve Ark part names and callback detail objects. Do not translate values, rebuild state machines,
scan children, or emulate providers. Retain Ark-owned hidden controls, ids, presence, positioning,
measurements, and runtime variables on every public composition path.

Solid context and item-state values may be accessors. Expose them in the idiomatic Ark Solid form
while keeping the same names and meaning as the React package.

## Ark factory components

Use `ark` and `HTMLArkProps` from `@ark-ui/solid/factory`. Keep the same default semantic host,
supported host choices, `asChild` behavior, data hooks, variants, and CSS-variable fallbacks.

Verify the installed Ark Solid factory's `asChild` and `ref` behavior before claiming parity. When
Ark Solid does not forward a `ref` through `asChild`, preserve that native limitation: do not wrap,
reinject, or compose the ref yourself. Test ordinary refs and `asChild` composition independently,
and record the framework-specific difference with the component. Do not weaken either supported
path merely to make their unsupported combination appear to work.

When the React component selects among several `ark.*` elements, preserve that explicit host map
unless the Solid API provides a smaller equally typed form. Do not add polymorphic helper layers for
a single component.

## CSS and foundation

For the CSS Modules track, start by copying the React CSS Module without semantic changes. Keep
selectors, tokens, public CSS variables, animations, and fallbacks aligned. For the Tailwind track,
follow `migration-css-modules-to-tailwind`; do not introduce a CSS Module.

Keep the CSS Module beside the Solid component; do not import it across framework package boundaries.
A framework-specific CSS difference is allowed only when the emitted platform contract genuinely
differs, and the reason must be recorded with the component.

The shared styles and presets belong to `packages/foundation/registry.json`. The Solid registry
references its published `/r/foundation/*.json` items; do not copy foundation files, use parent
paths, or introduce symlinks into a framework registry.

## Registry distribution

Each React/Solid registry is a separate source root. Its items may include only files under that
package and framework-native helpers. CSS Modules artifacts are published at `/r/react` and
`/r/solid`; Tailwind artifacts use `/r/react-tailwind` and `/r/solid-tailwind`.

- Start a Solid item from the matching React registry item in the same styling track, then use Solid
  source paths and `@ark-ui/solid` dependencies.
- Keep registry dependencies framework-specific: a Solid item may depend on
  `@moduix-solid/foundation`, `@moduix-solid/icons`, or another already-ported Solid item, never
  an `@moduix-react/*` item.
- Do not manually edit `website/docs/public/r`. Run `pnpm run build:registry` to regenerate
  foundation and all four package artifact trees together.

## Playground stories

Every component port includes framework-native stories in both playgrounds for its styling track:

- CSS Modules: `playgrounds/react/stories/<component>` and `playgrounds/solid/stories/<component>`;
- Tailwind: `playgrounds/react-tailwind/stories/<component>` and
  `playgrounds/solid-tailwind/stories/<component>`.

Keep the Storybook title, exported story names, scenario data, layout, visual states, and demo CSS
equivalent. The React playground story should differ from the package story only where its local
Storybook type imports or source aliases require it. Translate the Solid story to native Solid
syntax and reactivity; do not introduce a cross-framework story abstraction or import story code
across playgrounds.

Keep the React and Solid playground scenario sets symmetric. Do not silently drop a story because
it needs another component: port the dependency first or report the scenario and component port as
deferred. Do not add Storybook interaction tests, `play` functions, documentation, or addons as part
of a port. The playgrounds are for manual visual and interaction comparison; Rstest owns automated
behavioral coverage.

Keep component entries in paired playground sidebars alphabetically ordered through the shared
Storybook `storySort` configuration. Keep each playground visibly labelled with its runtime and
styling track, so manual parity checks always identify the active variant.

## Per-component workflow

1. Inventory the React exports, parts, props, defaults, CSS hooks, tests, stories, documentation, and
   internal dependencies.
2. Classify the component as an Ark primitive wrapper, Ark factory component, local composition, or
   third-party integration. Ensure required moduix dependencies have already been ported.
3. Verify the matching current Ark Solid API when applicable.
4. Implement the smallest native Solid equivalent and port only required local helpers or icons.
5. For CSS Modules, copy and compare the module. For Tailwind, translate and compare the class
   semantics. Then inspect the rendered anatomy and state attributes.
6. Port the React tests assertion-for-assertion by behavior using Solid testing utilities. Adapt only
   framework mechanics; do not weaken or delete contract assertions to make the port pass.
7. Copy the package React story into the paired React playground and create its scenario-equivalent
   Solid story. Keep exported scenarios and styling semantics aligned.
8. Add component-local and package exports only after implementation and declarations build. Add
   the Solid registry item once all of its registry dependencies are ported.
9. Run the Solid component tests and build. Compare the paired playground stories, then run registry
   generation when registry sources changed and finish the repository validation from `AGENTS.md`.

## Completion criteria

A port is complete only when:

- no React runtime or React type import remains in the Solid implementation;
- the intended public exports and namespaced parts match the React contract;
- existing React behavior tests have Solid equivalents and pass;
- the paired React and Solid playgrounds contain the same component scenarios and demo styling;
- DOM anatomy, accessibility, states, callback details, refs, and composition are equivalent;
- any unavoidable Ark Solid factory difference, including unsupported `ref` with `asChild`, is
  documented and tested as separate native paths;
- CSS Modules are identical, or Tailwind styling is semantically equivalent, unless a necessary difference is documented;
- the Solid registry item has only Solid dependencies and the matching generated artifact is included;
- the Solid package build and declaration output succeed;
- required repository formatting, lint, and type checks pass.

Report any intentionally deferred dependency, unsupported upstream feature, or unavoidable
framework-level difference explicitly. Do not represent a partial port as full parity.