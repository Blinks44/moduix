---
name: css-authoring
description: Use for CSS, CSS Modules, and component styling work in this repo.
---

# Skill: css-authoring

Use this skill for CSS, CSS Modules, and styling work in this repo.

## Scope

- component CSS Modules in `packages/react`
- docs example CSS Modules in `apps/docs`
- selector structure
- state styling
- responsive CSS
- CSS variable usage

## Core Rules

- Keep CSS readable, local, and predictable.
- Prefer flat, understandable styling over clever selector tricks.
- Use design tokens and public CSS variables instead of hardcoded one-off values when a token already exists.
- Keep component CSS and demo CSS separate. Library styling belongs in `packages/react`; demo-only layout belongs in stories or docs example CSS.

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

## Nesting

- Use modern CSS nesting so states, nested selectors, and media conditions stay close to the base selector.
- Prefer nesting for `:hover`, `:focus-visible`, data attributes, child selectors, and `@media`.
- Do not move related states into distant parts of the file when they can stay next to the base class.

Example:

```css
.root {
  padding: 4px;

  &:hover {
    padding: 8px;
  }
}
```

## Selector Complexity

- Do not write clever or overly complex selectors when a simpler selector or local nesting can express the same thing.
- Prefer the simplest selector that matches the component contract.
- Avoid deep chaining, unnecessary specificity, and fragile structure-dependent selectors unless the component truly requires them.
- When choosing between multiple valid selectors, write the one that is easiest to read and maintain.

## Practical Guidance

- Keep state selectors near the class they modify.
- Prefer `data-*` hooks and local class names over structural selectors when both are available.
- Use nesting to keep `@media` adjustments near the selector they affect.
- If a selector starts feeling hard to explain in one sentence, simplify it.