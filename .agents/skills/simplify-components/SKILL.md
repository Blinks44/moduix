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
- Keep `ark.*` factory elements and Ark primitive parts typed according to their different
  contracts rather than forcing one uniform syntax.
- When wrapping Ark primitive parts, prefer `ComponentRef<typeof Primitive.Part>` for refs and
  `ComponentProps<typeof Primitive.Part>` for props.
- When wrapping `ark` factory elements such as `ark.button`, `ark.a`, or `ark.div`, prefer
  `HTMLArkProps<'button'>`, `HTMLArkProps<'a'>`, and related intrinsic forms for props.
- Do not rewrite `ark.*` factory wrappers to `ComponentProps<typeof ark.div>`-style typing solely
  for visual consistency with primitive wrappers.
- Simplify implementation shape, not only the public API. Remove code patterns that read as
  over-generated or "AI-shaped" when they do not protect a real contract.
- Prefer code that a mid-level React engineer would write and maintain comfortably: direct values,
  direct conditionals, local helper functions with obvious names, and only the minimum type
  machinery needed to preserve Ark behavior.
- Treat repeated type gymnastics, sparse arrays assembled by index assignment, defensive
  normalization branches, and duplicated state-machine calls as simplification targets unless they
  preserve a real generic or Ark contract.
- Do not replace one type-heavy construction with another equally type-heavy construction and call
  it simplification. If the code still reads like type plumbing first and behavior second, keep
  simplifying.
- Prefer one obvious source of truth for small behaviors. If a component toggles, resolves ids, or
  computes default state in multiple places, centralize that logic in the smallest readable form.
- Keep necessary complexity when it buys real API correctness. For example, generic callable roots
  like `Combobox` may need explicit root component aliases and casts to preserve inference, and
  behavior helpers like `Lightbox` image resolution/preload logic may stay as small named
  functions because they represent real domain behavior rather than abstraction for its own sake.
- Preserve intentional product sugar. If the library added a small wrapper for a repeated product
  need, such as a styling or animation affordance, keep it unless it clearly hides structure or
  duplicates upstream behavior.
- Prefer the smallest possible private type surface. If a local alias exists only to save a few
  repeated characters or to wrap another derived type without adding meaning, inline it or remove
  it.
- When a value is genuinely awkward because the upstream contract is awkward, isolate that
  awkwardness in one obvious helper or literal. Do not spread the awkwardness across multiple types,
  constants, and normalization layers.
- Before finishing, compare the rewritten code against the original and ask: "Would a teammate say
  this is materially easier to read in one pass?" If the answer is weak, it is not simplified yet.
- Do not reorganize documentation into basic and advanced sections as part of simplification.
  Update only factual API references and remove stale examples when an exported contract changes.

## Workflow

1. Inspect the component implementation, local barrel, package exports, stories, local markdown,
   public docs, registry entry, and repository usages.
2. Inventory public values and types. Classify each as visual structure, ordinary behavior,
   convenience sugar, or advanced Ark state API.
3. Audit implementation readability. Mark any code that feels type-driven instead of behavior-driven:
   duplicated state transitions, over-derived helper types, needless `satisfies` chains, sparse
   arrays built imperatively, and local "normalization" branches that only restate the incoming
   union.
   Also mark "false simplifications": replacing inline readable code with aliases, helpers, or
   casts that do not remove real complexity.
4. Remove duplicate public type exports. Keep the minimum private generic types needed to preserve
   inference and refs.
5. Keep `RootProvider`, then remove other advanced state API only after locating and updating
   internal dependants. Do not remove a visual part merely because its use case is uncommon.
6. Rewrite overcomplicated implementation code toward direct, local code that still matches repo
   style. Prefer:
   - explicit literals over write-then-mutate setup;
   - small local helpers over copied state-machine branches;
   - simple prop types over nested `Omit`/`NonNullable`/re-exported aliases when inline types or
     local aliases are clearer;
   - behavior-first names over generic "resolved"/"normalized" plumbing when no real ambiguity exists;
   - one small unavoidable ugly helper over several "clean-looking" abstractions that only move the
     ugliness around;
   - deleting aliases and helper layers that do not reduce branching, duplication, or API surface.
7. Keep wrappers explicit and preserve Ark props, refs, `asChild`, callback details, accessibility,
   data attributes, and generic inference.
8. Synchronize affected stories, docs, barrels, registry metadata, and generated registry output.
9. Run the repository validation required by `AGENTS.md`.

## Heuristics from Current Library

- `Sidebar`: treat toggle logic, collapsed state labels, default panel wiring, and default resize
  values as behavior that should have one obvious source of truth. Avoid multiple "resolved\*" values,
  avoid defensive union normalization when props already constrain the union, and avoid replacing a
  bad cast with a different bad cast.
- `Combobox`: keep complexity that preserves generic inference, callable root ergonomics, and Ark
  behavior. Do not flatten real generic contracts just to make the file look shorter.
- `Lightbox`: keep small domain helpers when they encode real behavior such as image source
  resolution, preload flow, or viewer state transitions. Those helpers are product logic, not
  automatically "AI-shaped" code.
- If an awkward pattern remains because Ark or the product contract truly requires it, leave a
  straightforward local comment or helper rather than layering more types around it.

## Simplicity Test

Reject a proposed simplification when it:

- replaces visible composition with boolean props, item renderers, or hidden bundles;
- introduces a helper abstraction only to reduce line count;
- keeps obviously over-engineered code only because it is type-safe;
- swaps one over-engineered pattern for another with the same mental cost;
- duplicates a tiny state-machine action in multiple places instead of naming it once;
- uses derived React utility types or mutation-heavy setup where a direct local type or literal
  would read more clearly;
- adds local aliases, helper types, or normalization variables that do not remove a real branch,
  duplication point, or public concept;
- creates a second moduix-owned state or filtering model over Ark;
- removes styling access to a real DOM or Ark structural part;
- changes the intentional callable-root convention;
- expands documentation scope beyond keeping it accurate.

Prefer fewer public concepts, fewer moving parts, and code that reads like deliberate product code
instead of generated scaffolding.