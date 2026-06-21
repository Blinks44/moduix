# Separator

Upstream docs:

- Ark UI: no dedicated primitive; use https://ark-ui.com/docs/guides/composition and https://ark-ui.com/docs/guides/styling
- Chakra UI: https://chakra-ui.com/docs/components/separator

## Purpose

`Separator` is the moduix semantic divider for visually separating related content groups with a
horizontal or vertical rule.

## Upstream model to preserve

Ark UI does not ship a dedicated separator primitive. The wrapper follows Ark factory composition:
one exported `ark.span` root, `asChild` support for a single custom host, refs forwarded to the
rendered element, and Ark-style `data-scope` / `data-part` styling hooks.

Chakra's current Separator recipe materially informs this contract: `orientation`, `variant`,
`size`, a single root element, default horizontal orientation, and separator semantics through
`role="separator"` plus `aria-orientation`.

## Current behavior contract

- Public API is part-first: `Separator.Root`.
- The callable `Separator` export is the root part itself, so `<Separator />` and
  `<Separator.Root />` are equivalent.
- `Separator.Root` accepts Ark factory span props plus local `orientation`, `variant`, and `size`.
- `asChild` replaces the host element through Ark factory composition; there is no legacy `render`
  prop.
- Default props are `orientation="horizontal"`, `variant="solid"`, and `size="sm"`.
- The component is non-interactive and has no controlled state, uncontrolled state, callbacks,
  keyboard behavior, focus management, form participation, `HiddenInput`, or provider/context API.

## Anatomy and exported parts

```text
Separator / Separator.Root
└─ root[data-scope="separator"][data-part="root"][data-slot="separator-root"]
```

| Part                           | `data-slot`      | Notes                                                                      |
| ------------------------------ | ---------------- | -------------------------------------------------------------------------- |
| `Separator` / `Separator.Root` | `separator-root` | Single divider element with orientation, size, variant, and ARIA metadata. |

## Composition

Use the short root form for normal separators:

```tsx
import { Separator } from '@moduix/react';

export function AccountSections() {
  return (
    <div>
      <span>Account settings</span>
      <Separator />
      <span>Billing details</span>
    </div>
  );
}
```

Use `asChild` when the host must be a native element such as `hr`:

```tsx
<Separator asChild>
  <hr />
</Separator>
```

The child must be a single semantic element that can carry the merged separator props.

## Upstream feature coverage

- Ark composition: covered with `ark.span`, `HTMLArkProps<'span'>`, `asChild`, and forwarded refs.
- Ark styling: covered with `data-scope="separator"`, `data-part="root"`, state-free data
  attributes, and direct `className` support.
- Chakra orientation: covered with `orientation="horizontal" | "vertical"`.
- Chakra variants: covered with `variant="solid" | "dashed" | "dotted"`.
- Chakra sizes: covered with `size="xs" | "sm" | "md" | "lg"`.
- Chakra responsive orientation: intentionally not mirrored as a prop system because moduix does
  not expose Chakra's responsive style-prop runtime. Consumers can switch `orientation`
  responsively in their own React/CSS layer.
- Chakra label example: intentionally not implemented as a `label` prop. Use surrounding
  composition when a divider needs text because moduix keeps this component single-part and
  semantic.

## Accessibility and state

- The root writes `role="separator"` by default.
- The root writes `aria-orientation` from the resolved `orientation` when its role is `separator`.
- Consumers can pass `role="presentation"` when a line is purely decorative; then the default
  `aria-orientation` is omitted.
- The root writes `data-orientation`, `data-size`, and `data-variant` for styling.
- There are no interactive states and no Ark runtime CSS variables for measured layout.
- Refs point to the rendered separator host. With `asChild`, the child element receives the merged
  props and ref.

## Defaults and styling

| Entry         | Default      | Values / Notes                       |
| ------------- | ------------ | ------------------------------------ |
| `orientation` | `horizontal` | `horizontal`, `vertical`             |
| `variant`     | `solid`      | `solid`, `dashed`, `dotted`          |
| `size`        | `sm`         | `xs`, `sm`, `md`, `lg`               |
| `asChild`     | `false`      | Ark factory single-child composition |

Public CSS variables:

| Variable                        | Default                                | Effect                                   |
| ------------------------------- | -------------------------------------- | ---------------------------------------- |
| `--separator-border-style`      | `solid`                                | Border style used by the active variant. |
| `--separator-color`             | `var(--color-border)`                  | Divider color.                           |
| `--separator-length-horizontal` | `100%`                                 | Width for horizontal mode.               |
| `--separator-length-vertical`   | `1em`                                  | Height for vertical mode.                |
| `--separator-size-thickness`    | size-specific, `1px` for `size="sm"`   | Recipe thickness selected by `size`.     |
| `--separator-thickness`         | `var(--separator-size-thickness, 1px)` | Consumer override for both orientations. |

## Intentional sugar and differences from upstream

- Ark UI has no dedicated `Separator` primitive; moduix uses the Ark factory and documents the
  component as a moduix-owned single-part contract.
- moduix keeps Chakra's useful `orientation`, `variant`, and `size` surface but maps visuals to
  moduix tokens and CSS variables.
- legacy `render`, legacy state callback `className`, and legacy style callback behavior were
  removed. Use Ark `asChild` and direct `className` instead.
- moduix does not implement Chakra's responsive prop system or label prop pattern for this wrapper.

## Agent notes

- Keep `Separator` thin and state-free. Do not add variants beyond the current recipe-like
  `variant` / `size` API without updating docs, stories, theme tokens, and registry output.
- Preserve `data-scope`, `data-part`, `data-slot`, `data-orientation`, `data-size`, and
  `data-variant`; these are the public styling hooks.
- Keep the line border-based, not background-based, so dashed and dotted variants remain native CSS
  border styles.

## Local changelog

- 2026-06-20: Migrated from legacy to an Ark factory wrapper, added `Separator.Root`, `asChild`,
  `variant`, `size`, Ark-style data hooks, Chakra-informed ARIA semantics, and removed legacy
  `render` compatibility.
- 2026-06-03: Rewrote the local documentation around the real moduix wrapper, documented the
  shipped styling contract and accessibility behavior, and aligned the wrapper with the repo Base
  UI `forwardRef` pattern.