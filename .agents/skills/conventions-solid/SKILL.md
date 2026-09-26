---
name: conventions-solid
description: Use for Solid JS/TS work in packages/solid and packages/solid-tailwind. Preserve native reactivity, Ark Solid contracts, and the shared flat public API.
---

# Solid Conventions

Use this skill for JS/TS Solid work in this repo.

## Scope

- Solid components in `packages/solid` and `packages/solid-tailwind`
- local helpers, contexts, refs, children, and reactive state
- Ark Solid primitives and factory elements

## Core Rules

- Use plain Solid components and Solid JSX. Do not translate React hooks, `forwardRef`, render
  props, context mechanics, or eager child evaluation into Solid-shaped wrappers.
- Preserve prop reactivity. Do not destructure reactive props; use direct property access,
  `splitProps`, or `mergeProps` when values may change.
- Use Solid's `children` helper only when a wrapper must inspect, default, or read children more than
  once. Do not resolve ordinary reactive children eagerly.
- Pass Solid refs through according to the real Ark or intrinsic element contract. Do not add a
  React-style ref helper or wrapper solely for textual parity.
- Use `class`, Solid event types, and Solid style types. In Tailwind components, merge defaults and
  the consumer class last with the package-local `cn` helper according to `conventions-css`.
- Keep contexts reactive. Expose accessors or signals rather than setup-time snapshots, and preserve
  the established meaning of each public context value.
- Keep setup and module evaluation SSR-safe. Access browser globals, DOM nodes, observers, and layout
  only behind the appropriate lifecycle or an existing client-safe helper.
- Keep helpers and icons Solid-local and import runtime code and types only from the Solid package,
  Solid libraries, or framework-neutral foundation modules.
- Export the root under the family name, every other part with the family prefix, and hooks as
  top-level functions. Do not create compound objects, static part properties, namespace exports,
  `.Root` aliases, or duplicate `<Family>Root` values.
- Keep component-local `index.ts` files as re-export-only barrels.

## Ark Solid Rules

- Import primitives from `@ark-ui/solid` and factory elements from `@ark-ui/solid/factory`. Never
  import another Ark adapter.
- Verify current Ark Solid exports, props, callbacks, providers, contexts, refs, presence, and
  generic collection behavior instead of inferring them from React or Vue.
- Map each public part to the matching Ark Solid part. Preserve Ark-owned hidden controls, ids,
  positioning, measurements, state attributes, presence, and runtime CSS variables.
- Preserve callback detail objects. Do not unpack or rename their fields merely to resemble another
  framework's callback syntax.
- For factory elements, use `ark` and `HTMLArkProps` with the real semantic host. Preserve supported
  host choices, `asChild`, data hooks, style behavior, and native ref semantics.
- Verify ordinary refs and `asChild` independently. Preserve an upstream limitation rather than
  adding wrapper elements, cloning children, or composing refs to disguise it.

## Distribution

- CSS Modules stay local to the Solid package. Tailwind utilities follow `conventions-css`; do not
  import a component implementation or stylesheet from another framework package.
- Package exports, declarations, registry source, tests, and playground stories must consume the
  same flat values exposed by the component barrel.
- Registry items must contain Solid-native source and depend only on matching Solid or
  framework-neutral registry items.