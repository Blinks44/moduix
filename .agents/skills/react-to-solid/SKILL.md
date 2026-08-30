---
name: react-to-solid
description: Port existing moduix components from packages/react to packages/solid while preserving their public, behavioral, accessibility, DOM, and styling contracts. Use only for React-to-Solid component migrations, not Vue ports or framework-neutral foundation work.
---

# React to Solid

Port the shipped React component as a native Solid adapter. Preserve moduix and Ark behavior without
introducing a shared component runtime, generated TSX, or React-compatibility layer.

## Sources of truth

Read the React component implementation, CSS Module, test, story, local markdown, exports, and any
internal helpers it uses. Treat the shipped code and tests as the executable contract; use the local
markdown to identify intentional moduix behavior. Resolve contradictions before porting rather than
silently choosing one source.

Read the current Ark Solid component page or guide whenever an Ark primitive, factory, provider,
context, ref, presence behavior, or callback contract is involved. Do not infer the Solid API from
the React package. If Ark Solid lacks a required primitive or surface, stop and report the gap instead
of recreating Ark internals.

Use `packages/foundation` as the existing cross-framework source. Do not move component JSX, CSS
Modules, icons, or framework-specific helpers into foundation as part of an ordinary port.

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
- Merge the consumer `class` with the local CSS Module class. Do not port React-only
  `normalizeClassName` behavior unless the Solid target type demonstrably requires it.
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

When the React component selects among several `ark.*` elements, preserve that explicit host map
unless the Solid API provides a smaller equally typed form. Do not add polymorphic helper layers for
a single component.

## CSS and foundation

Start by copying the React CSS Module without semantic changes. Keep selectors, tokens, public CSS
variables, animations, and fallbacks aligned. The target component should emit the same anatomy and
Ark data attributes so the same CSS remains valid.

Keep the CSS Module beside the Solid component; do not import it across framework package boundaries.
A framework-specific CSS difference is allowed only when the emitted platform contract genuinely
differs, and the reason must be recorded with the component.

Configure the Solid package to copy the same foundation styles and presets into its own output. Do
not create a published foundation runtime dependency unless that packaging decision is requested
separately.

## Per-component workflow

1. Inventory the React exports, parts, props, defaults, CSS hooks, tests, stories, documentation, and
   internal dependencies.
2. Classify the component as an Ark primitive wrapper, Ark factory component, local composition, or
   third-party integration. Ensure required moduix dependencies have already been ported.
3. Verify the matching current Ark Solid API when applicable.
4. Implement the smallest native Solid equivalent and port only required local helpers or icons.
5. Copy and compare the CSS Module, then inspect the rendered anatomy and state attributes.
6. Port the React tests assertion-for-assertion by behavior using Solid testing utilities. Adapt only
   framework mechanics; do not weaken or delete contract assertions to make the port pass.
7. Add component-local and package exports only after implementation and declarations build.
8. Run the Solid component tests and build, then the repository validation required by `AGENTS.md`.

If `packages/solid` does not exist, create only the minimal bundleless ESM Rslib package needed for
the requested component. Align the Ark Solid version with the Ark React line, keep `solid-js` and Ark
as peers, copy foundation output like the React package, and use the repository's Rslib and Rstest
skills. Do not scaffold documentation, a registry, Storybook, or every future export unless requested.

## Completion criteria

A port is complete only when:

- no React runtime or React type import remains in the Solid implementation;
- the intended public exports and namespaced parts match the React contract;
- existing React behavior tests have Solid equivalents and pass;
- DOM anatomy, accessibility, states, callback details, refs, and composition are equivalent;
- CSS Modules are identical unless a necessary difference is documented;
- the Solid package build and declaration output succeed;
- required repository formatting, lint, and type checks pass.

Report any intentionally deferred dependency, unsupported upstream feature, or unavoidable
framework-level difference explicitly. Do not represent a partial port as full parity.