---
name: conventions-css
description: Author and synchronize foundation CSS, component CSS Modules, Tailwind classes, and demo styles across moduix package variants.
---

# CSS Conventions

Use this skill for CSS, CSS Modules, and styling work in this repo.

## Scope

- component CSS Modules in shipped `packages/<framework>` adapters
- component utility classes in shipped `packages/<framework>-tailwind` adapters
- shared tokens, layers, reset, animations, and presets in `packages/foundation`
- docs example CSS Modules in `website`
- selector structure
- state styling
- responsive CSS
- CSS variable usage

## Core Rules

- Keep CSS readable, local, and predictable.
- Prefer flat, low-specificity selectors. Use local nesting to keep pseudo-classes, state attributes,
  child selectors, and media queries near the rule they modify.
- Prefer Ark `data-*` hooks and local class names over deep or structure-dependent selector chains.
- If a selector is difficult to explain in one sentence, simplify it.
- In CSS Modules, use design tokens and public CSS variables instead of hardcoded one-off values when a token already exists.
- Keep component CSS and demo CSS separate. Library styling belongs in its package; demo-only layout belongs in stories or docs examples.
- When a component exists in several variants, preserve the same visual and state contract. Keep
  CSS Modules equivalent across framework adapters, and translate that result into native Tailwind
  utilities for every shipped Tailwind counterpart.
- Do not import CSS Modules across packages or add them to a Tailwind component.

## CSS Variable References

- `packages/foundation/src/styles/variables-moduix.css` and `packages/foundation/src/styles/variables-ark.css` are internal
  reference sources for the public moduix and Ark runtime custom-property contracts. Never import either file at
  runtime, publish it in the npm build, or ship it through the shadcn registry.
- When adding, renaming, or removing a public custom property, update the relevant reference source and the
  component documentation in the same change. Do not add IDE metadata or a generator solely for CSS completion.

## Ark Styling

- Target Ark parts with `data-scope` and `data-part` when the selector needs to bind to the upstream anatomy.
- Target Ark state with state attributes such as `data-state`, `data-disabled`, `data-invalid`, `data-focus`,
  `data-highlighted`, `data-selected`, and component-specific attributes from the Ark docs.
- Keep moduix `data-slot` and local class selectors for public styling hooks and visual defaults. Do not rely on
  structure-only selectors when Ark attributes or `data-slot` can express the contract.
- Preserve and use Ark runtime CSS variables for measured layout, popup sizing, transform origin, and animations
  when the primitive provides them.
- For mount and unmount animations, prefer CSS keyframes on `[data-state='open']` and `[data-state='closed']`.
  JavaScript animation paths should rely on Ark `present` in component code rather than CSS-only assumptions.
- Do not translate Ark state attributes into parallel custom modifier classes unless the wrapper exposes an
  intentional local styling contract.
- Do not override Ark-owned positioning, measurements, transforms, or runtime variables without confirming the
  primitive contract. For responsive or animated overlays, verify opening, closing, interrupted, and reduced-motion
  states at each supported direction and viewport.

## Tailwind Variants

- Use each package's local `cn` helper and put the consumer class last so consumer utilities win conflicts.
- Keep every part's fixed static utilities directly in its JSX `cn(...)` call. Do not extract
  intermediate class-string constants. A component-local `cva` recipe is appropriate when it makes
  prop-driven visual variants or an identical Root/RootProvider recipe materially clearer. Keep its
  utilities statically discoverable, use it in every affected Tailwind runtime, and merge the consumer class
  last through `cn`. Do not use `cva` for Ark-owned runtime `data-*` states or fixed styles.
- Preserve the same API, behavior, states, accessibility, and visual defaults as CSS Modules, but
  use Tailwind's native customization model rather than mirroring every component CSS variable.
- Prefer familiar utilities and the foundation's named semantic theme utilities. Use arbitrary
  values only for genuine one-off values, calculations, selectors, or required runtime variables.
- Keep custom theme suffixes synchronized with every Tailwind package's local class merge
  configuration when `tailwind-merge` cannot infer their conflict groups.
- Namespace custom theme suffixes that would otherwise collide with Tailwind defaults across the
  shared theme namespace. Semantic spacing uses `space-*` rather than bare `xs`/`sm`/`md`/`lg`/`xl`
  so utilities such as `max-w-lg` keep their standard meaning.
- Do not add `--moduix-<component>-*` wrappers around ordinary spacing, sizing, typography, border,
  opacity, or transition utilities. Keep detailed component variables in CSS Modules where they are
  useful; Tailwind consumers override defaults through `className`/`class` and `tailwind-merge`.
- Keep Ark state variants next to the base utilities they modify.
- Tailwind Preflight owns reset behavior; do not combine it with `foundation/src/styles/reset.css`.
- Let oxfmt sort utility classes. Do not add another formatter or hand-maintained ordering scheme.
- Keep the npm scan path limited to `dist/components`; shadcn-copied source is discovered in the consumer project and needs no package `@source`.