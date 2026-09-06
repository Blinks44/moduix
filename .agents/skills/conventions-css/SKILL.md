---
name: conventions-css
description: Author and synchronize foundation CSS, component CSS Modules, Tailwind classes, and demo styles across moduix package variants.
---

# CSS Conventions

Use this skill for CSS, CSS Modules, and styling work in this repo.

## Scope

- component CSS Modules in `packages/react` and `packages/solid`
- component utility classes in `packages/react-tailwind` and `packages/solid-tailwind`
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
- Use design tokens and public CSS variables instead of hardcoded one-off values when a token already exists.
- Keep component CSS and demo CSS separate. Library styling belongs in its package; demo-only layout belongs in stories or docs examples.
- When a component exists in several variants, preserve the same visual and state contract. Keep
  React and Solid CSS Modules equivalent, and translate that result into Tailwind utilities for both
  Tailwind packages.
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
- Prefer named token utilities and CSS-variable-backed arbitrary values over copied literals.
- Keep Ark state variants next to the base utilities they modify.
- Tailwind Preflight owns reset behavior; do not combine it with `foundation/src/styles/reset.css`.
- Let oxfmt sort utility classes. Do not add another formatter or hand-maintained ordering scheme.
- Keep the npm scan path limited to `dist/components`; shadcn-copied source is discovered in the consumer project and needs no package `@source`.