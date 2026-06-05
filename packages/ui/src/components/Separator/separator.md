# Separator

Upstream primitive docs: https://base-ui.com/react/components/separator.md

## Purpose

`Separator` is the moduix semantic divider for splitting related content groups with a horizontal or
vertical rule.

Use it when the line itself communicates structure. Do not use it as a pure spacing helper; use
layout primitives or spacing tokens for whitespace-only separation.

## Current behavior contract

- `Separator` is a thin styled wrapper over `@base-ui/react/separator`.
- It renders one root part with `data-slot="separator-root"`.
- The default orientation is horizontal.
- Horizontal separators use `width: 100%` by default.
- Vertical separators use `height: 1em` by default so they align naturally with inline text and
  compact action groups.
- The wrapper forwards the primitive ref to the rendered element.
- Base UI separator props stay available, including `orientation`, `className`, `style`, `render`,
  standard div props, and ARIA attributes.
- There are no moduix variants, size props, helper props, compound parts, or controlled/uncontrolled
  patterns.

## Basic usage

Horizontal section divider:

```tsx
import { Separator } from 'moduix';

export function AccountSetupSummary() {
  return (
    <div>
      <span>Account settings</span>
      <Separator />
      <span>Billing details</span>
    </div>
  );
}
```

Vertical inline divider:

```tsx
import { Separator } from 'moduix';

export function MainNav() {
  return (
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/pricing">Pricing</a>
      <Separator orientation="vertical" />
      <a href="/signin">Sign in</a>
    </nav>
  );
}
```

## Composition

`Separator` exposes a single root element.

```text
Separator
└─ root[data-slot="separator-root"][data-orientation]
```

The component stays intentionally flat:

- one exported part
- direct primitive prop passthrough
- direct root styling through `className`
- four public `--separator-*` CSS variables for common visual tuning

Use `render` only when you intentionally need to replace the host element while preserving separator
semantics from the primitive.

## Public props

`Separator` accepts Base UI separator props. The wrapper-specific contract is small:

| Prop          | Type                         | Default        | Notes                                                                      |
| ------------- | ---------------------------- | -------------- | -------------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Changes the divider axis and the `data-orientation` styling hook.          |
| `className`   | primitive `className`        | —              | Merged with the moduix root class. Base UI callback form still works.      |
| `style`       | primitive `style`            | —              | Applied to the root. Base UI callback form still works.                    |
| `render`      | primitive `render`           | —              | Replaces the host element when you need custom composition.                |
| `ref`         | forwarded ref                | —              | Points to the rendered separator element for measurement or custom wiring. |

There is no additional moduix sugar on top of the primitive.

## Styling API

### Stable hooks

| Hook                                      | Purpose                                  |
| ----------------------------------------- | ---------------------------------------- |
| `data-slot="separator-root"`              | Stable selector for the exported root.   |
| `data-orientation="horizontal\|vertical"` | Axis-specific styling hook from Base UI. |

There are no variant attributes and no interactive state attributes.

### Public CSS variables

`Separator` exposes these public variables through `theme.css` and the component stylesheet:

| Variable                        | Default               | Effect                     |
| ------------------------------- | --------------------- | -------------------------- |
| `--separator-color`             | `var(--color-border)` | Divider color.             |
| `--separator-length-horizontal` | `100%`                | Width for horizontal mode. |
| `--separator-length-vertical`   | `1em`                 | Height for vertical mode.  |
| `--separator-thickness`         | `1px`                 | Thickness for both axes.   |

Example override:

```css
.emphasisDivider {
  --separator-color: var(--color-primary);
  --separator-length-horizontal: 8rem;
  --separator-thickness: 2px;
}
```

## UX and accessibility

- The primitive renders separator semantics for assistive technology (`role="separator"` and the
  orientation ARIA metadata).
- Use horizontal separators between blocks or stacked content sections.
- Use vertical separators inside inline layouts such as compact navigation, command bars, or metadata
  rows.
- Vertical separators depend on the parent layout for visual alignment. In flex or inline-flex rows,
  keep surrounding content aligned on the same cross axis.
- The component is not interactive: no keyboard navigation, focus management, disabled state, or
  read-only state.
- Keep visible labels and grouping context around the separator; the line should support structure,
  not be the only indicator of meaning.

## Intentional differences from Base UI

- moduix exports a single flat `Separator` wrapper instead of documenting the full upstream reference
  surface locally.
- moduix adds default styling, the stable `data-slot="separator-root"` hook, and the public
  `--separator-*` CSS variable contract.
- This local file documents the shipped moduix wrapper contract, not Base UI canonical types or full
  upstream API tables.

## Agent notes

- Keep `Separator` thin. Do not add variants, helper props, slot prop bags, or spacing-oriented sugar
  unless a repeated library-wide need clearly appears.
- Preserve the `data-slot` hook, `data-orientation` styling contract, and the public
  `--separator-*` variables.
- If separator sizing defaults or styling hooks change, update `Separator.tsx`, `Separator.module.css`,
  stories, docs examples, and this file in the same task.

## Local changelog

- 2026-06-03: Rewrote the local documentation around the real moduix wrapper, documented the shipped
  styling contract and accessibility behavior, and aligned the wrapper with the repo Base UI
  `forwardRef` pattern.