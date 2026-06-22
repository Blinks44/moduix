# Heading

Upstream docs:

- Ark UI composition guide: https://ark-ui.com/docs/guides/composition
- Ark UI factory: https://ark-ui.com/docs/guides/composition#factory

## Purpose

`Heading` provides semantic document headings with moduix typography sizes, weights, and styling
tokens.

## Upstream model to preserve

Ark UI does not ship a dedicated heading primitive. moduix implements `Heading` as a thin
`@ark-ui/react/factory` wrapper.

Preserve the root-only model: native `h1` output by default, semantic element replacement through
the `as` prop for `h1` through `h6`, Ark factory `asChild` for custom host composition, and no
legacy `render` contract.

## Current behavior contract

- `Heading` is the primary root component.
- `Heading.Root` is the same component exposed for Ark-style namespace consistency.
- The root renders `h1` by default and accepts `as="h1"` through `as="h6"` for semantic level
  changes.
- Ark factory `asChild` remains available for custom host composition.
- `size` controls visual scale independently from semantic level.
- `weight` defaults to `semibold`.
- Without an explicit `size`, native `h1` through `h6` elements map to `2xl` through `xs`.
- The component has no managed state, callbacks, keyboard behavior, or ARIA abstraction.

## Anatomy and exported parts

```text
Heading / Heading.Root
└─ text or inline content
```

| Part                       | Stable hooks                                                           |
| -------------------------- | ---------------------------------------------------------------------- |
| `Heading` / `Heading.Root` | `data-scope="heading"`, `data-part="root"`, `data-slot="heading-root"` |

The root also exposes `data-size` when `size` is explicit and `data-weight` for the resolved weight
preset.

## Composition

```tsx
import { Heading } from '@moduix/react';

export function Example() {
  return (
    <Heading as="h2" size="2xl">
      Page title rendered as h2
    </Heading>
  );
}
```

Use the short `<Heading>` form for an `h1`. Use the equivalent `<Heading.Root>` form when namespace
consistency is useful. Use `asChild` only when a custom semantic host must own the DOM node.

## Upstream feature coverage

- Semantic heading levels are supported through the `as` prop.
- Ark factory composition is supported through `asChild`.
- Native heading attributes and refs are forwarded to the rendered element.
- Dedicated Ark anatomy, state, callbacks, providers, context hooks, and CSS variables are not
  applicable because Ark has no heading primitive.
- The relevant upstream example surface is semantic host composition; moduix documents default
  `h1`, all native heading levels, visual sizes, weights, and custom styling.

## Accessibility and state

- The rendered `h1` through `h6` element provides native heading semantics without additional ARIA.
- Choose heading levels from the document outline. Use `size` for visual hierarchy changes.
- `asChild` must receive exactly one semantic heading child. Using a non-heading host would discard
  the component's intended accessibility contract.
- The forwarded ref targets the rendered heading element.
- There is no controlled or uncontrolled state, keyboard navigation, form context, hidden input, or
  callback contract.

## Defaults and styling

| Entry       | Default             | Values / Notes                          |
| ----------- | ------------------- | --------------------------------------- |
| element     | `h1`                | Use `as` for `h2` through `h6`          |
| `size`      | by rendered element | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`     |
| `weight`    | `semibold`          | `regular`, `medium`, `semibold`, `bold` |
| `asChild`   | `false`             | Ark factory composition                 |
| `className` | -                   | Applied to the rendered heading root    |

Default semantic size mapping:

| Element | Size  |
| ------- | ----- |
| `h1`    | `2xl` |
| `h2`    | `xl`  |
| `h3`    | `lg`  |
| `h4`    | `md`  |
| `h5`    | `sm`  |
| `h6`    | `xs`  |

Public CSS variables:

| Variable                         | Default                               |
| -------------------------------- | ------------------------------------- |
| `--heading-color`                | `var(--color-foreground)`             |
| `--heading-font-family`          | inherited                             |
| `--heading-font-size`            | size-dependent fallback               |
| `--heading-font-size-{size}`     | matching `--text-*` token             |
| `--heading-font-weight`          | selected weight fallback              |
| `--heading-font-weight-{weight}` | matching `--weight-*` token           |
| `--heading-letter-spacing`       | `0`                                   |
| `--heading-line-height`          | size-dependent fallback               |
| `--heading-line-height-{size}`   | matching `--line-height-text-*` token |
| `--heading-text-wrap`            | `balance`                             |

The root also uses `overflow-wrap: break-word`.

## Intentional sugar and differences from upstream

- moduix adds visual `size` and `weight` props and the `--heading-*` token contract.
- moduix adds the `as` prop for common heading-level selection.
- moduix adds `Heading.Root` as an Ark-style namespace alias.
- moduix adds `data-scope`, `data-part`, and stable `data-slot` hooks.
- The removed `HeadingLevel` type is intentionally not preserved.
- `data-size` represents an explicit size override. When omitted, CSS derives the visual size from
  the actual heading element.

## Agent notes

- Keep this component root-only and stateless.
- Preserve the native `h1` default, `as` level selection, `asChild` composition, heading-only
  semantic constraint, and ref forwarding.
- Keep explicit `size` selectors stronger than the implicit element-based size mapping.
- Preserve the public `data-*` and `--heading-*` styling contracts.

## Local changelog

- 2026-06-22: Restored a limited `as` prop for `h1` through `h6` so semantic heading levels no
  longer require `asChild`; kept `asChild` for Ark factory composition.
- 2026-06-19: Migrated `Heading` from the legacy `as` contract to an Ark factory root with
  `asChild`, `Heading.Root`, ref forwarding, Ark-style part hooks, semantic element-based default
  sizing, and synchronized stories and documentation.
- 2026-06-02: Documented the previous native wrapper contract and exported typography types.