---
name: simplify-components
description: Simplify public APIs and implementations of Ark-backed moduix React components without hiding visual structure or introducing abstraction. Use when auditing or reducing component types, exports, namespace members, wrappers, or advanced state APIs in packages/react.
---

# Simplify Components

Reduce cognitive load and public API size while keeping component composition explicit and the
implementation direct.

## Required Decisions

- Remove public prop, component, event-detail, context, and utility type aliases or re-exports that
  only duplicate Ark UI. Keep implementation-only types private. Advanced consumers can import
  upstream types directly from Ark UI.
- Preserve the callable root assembled with `Object.assign`. Both `<Component>` and
  `<Component.Root>` are intentional supported forms.
- Preserve `RootProvider` when Ark exposes it. The moduix wrapper must keep root styling, refs,
  `data-slot`, portal configuration, and other shared root behavior for externally owned Ark state.
- Remove other advanced state-machine APIs from the moduix public surface when ordinary component
  usage does not need them. This includes renderless `Context` / `ItemContext` parts and
  `useComponent` / context hooks. Import hooks and context APIs directly from Ark UI when an
  advanced workflow needs them.
- Preserve every meaningful visual or structural part, including controls, labels, positioners,
  content, groups, items, indicators, and empty states. Users must retain direct styling and
  composition access.
- Preserve direct, named wrapper components. Do not replace repetitive wrappers with factories,
  HOCs, configuration maps, or generic part builders.
- Preserve narrow sugar that removes common boilerplate without hiding structure, such as default
  icons and automatic portal transport.
- Do not reorganize documentation into basic and advanced sections as part of simplification.
  Update only factual API references and remove stale examples when an exported contract changes.

## Workflow

1. Inspect the component implementation, local barrel, package exports, stories, local markdown,
   public docs, registry entry, and repository usages.
2. Inventory public values and types. Classify each as visual structure, ordinary behavior,
   convenience sugar, or advanced Ark state API.
3. Remove duplicate public type exports. Keep the minimum private generic types needed to preserve
   inference and refs.
4. Keep `RootProvider`, then remove other advanced state API only after locating and updating
   internal dependants. Do not remove a visual part merely because its use case is uncommon.
5. Keep wrappers explicit and preserve Ark props, refs, `asChild`, callback details, accessibility,
   data attributes, and generic inference.
6. Synchronize affected stories, docs, barrels, registry metadata, and generated registry output.
7. Run the repository validation required by `AGENTS.md`.

## Simplicity Test

Reject a proposed simplification when it:

- replaces visible composition with boolean props, item renderers, or hidden bundles;
- introduces a helper abstraction only to reduce line count;
- creates a second moduix-owned state or filtering model over Ark;
- removes styling access to a real DOM or Ark structural part;
- changes the intentional callable-root convention;
- expands documentation scope beyond keeping it accurate.

Prefer fewer public concepts over fewer implementation lines.