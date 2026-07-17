# Simple Grid

## Upstream docs

- Ark UI: there is no dedicated SimpleGrid primitive. The component follows the Ark factory and
  composition model: https://ark-ui.com/docs/guides/composition
- Chakra UI SimpleGrid: https://chakra-ui.com/docs/components/simple-grid

## Purpose

`SimpleGrid` lays out children in equal-width columns, either with a fixed column count or with an
automatic count based on the minimum child width.

## Upstream model to preserve

`SimpleGrid` is a moduix-owned layout component built with the Ark factory. It follows Chakra's
`columns` and `minChildWidth` mental model without adopting Chakra's responsive style-prop system.
It has one root part and no provider, context, state machine, or item wrappers.

## Current behavior contract

- `SimpleGrid` and `SimpleGrid.Root` reference the same root component.
- Root accepts Ark factory div props, including `asChild`.
- `columns` creates a fixed number of equal-width tracks with
  `repeat(columns, minmax(0, 1fr))`.
- `minChildWidth` creates an intrinsic responsive grid with `auto-fit`. Numeric values are treated
  as pixels.
- `minChildWidth` takes priority over `columns` when both are provided.
- When neither layout prop is provided, the root renders one column.
- `gap`, `rowGap`, and `columnGap` accept CSS lengths. Numeric values use React's pixel semantics.
- The component does not define breakpoints, responsive object props, grid items, spans, or areas.

## Anatomy and exported parts

```text
SimpleGrid
└─ Root (data-slot="simple-grid-root")
```

- `SimpleGrid`: recommended short root form.
- `SimpleGrid.Root`: equivalent namespace form.

The root exposes `data-scope="simple-grid"`, `data-part="root"`, and
`data-slot="simple-grid-root"`.

## Composition

Use `minChildWidth` when the number of columns should follow the available width:

```tsx
import { SimpleGrid } from '@moduix/react';

export function Example() {
  return (
    <SimpleGrid minChildWidth="16rem" gap="var(--spacing-4)">
      <article>Analytics</article>
      <article>Billing</article>
      <article>Reports</article>
    </SimpleGrid>
  );
}
```

Use `columns` when the column count is fixed:

```tsx
<SimpleGrid columns={3} gap={12}>
  {items}
</SimpleGrid>
```

## Upstream feature coverage

- Ark factory composition and `asChild`: supported.
- Forwarded root ref: supported.
- Chakra fixed columns: supported with a positive `columns` number.
- Chakra auto-responsive layout: supported through `minChildWidth`, `auto-fit`, and `minmax()`.
- Chakra row and column gaps: supported.
- Chakra responsive style props and Grid item span helpers: intentionally unsupported.

## Accessibility and state

`SimpleGrid` only affects layout and adds no roles, labels, keyboard behavior, focus management, or
state. Consumers remain responsible for choosing semantic child elements. Use `asChild` when the
grid root should be an element such as `section`, `ul`, or `nav`; the child must be a single
element. The forwarded ref targets the rendered root.

## Defaults and styling

| Entry           | Default         | Values / Notes                              |
| --------------- | --------------- | ------------------------------------------- |
| `columns`       | `1`             | Positive number of equal-width columns      |
| `minChildWidth` | -               | CSS length; numbers are converted to pixels |
| `gap`           | browser default | CSS length                                  |
| `rowGap`        | browser default | CSS length                                  |
| `columnGap`     | browser default | CSS length                                  |
| `asChild`       | `false`         | Ark factory composition                     |
| `className`     | -               | Applied to the root                         |
| `style`         | -               | Applied last as the instance override       |

The component writes `display: grid`, the one-column fallback, and any provided layout props as
inline styles on the root. For media or container query layouts, omit `columns` and
`minChildWidth`, then set `grid-template-columns` through `className`. The `style` prop is merged
last and remains the final per-instance override.

## Intentional sugar and differences from upstream

- `SimpleGrid` is local rather than an Ark primitive.
- It keeps only the fixed-column and intrinsic auto-fit use cases.
- It does not introduce a breakpoint system or accept responsive object values.
- It does not render wrappers around children.

## Agent notes

- Keep the component root-only and stateless.
- Keep `minChildWidth` as the higher-priority layout mode when both props are present.
- Preserve the `min(100%, minChildWidth)` guard so narrow containers do not overflow.
- Do not add breakpoint props or Grid item APIs without a separate library-wide styling decision.

## Local changelog

- 2026-07-11: Made the `style` prop the final override for generated gaps, and documented that
  `minChildWidth` takes priority when both layout props are supplied.
- 2026-07-04: Moved the base `display: grid` and one-column fallback from the CSS module into inline
  root styles so layout and gaps do not depend on a separate component CSS chunk.
- 2026-07-04: Simplified the props and layout resolution so `minChildWidth` wins over `columns`
  at runtime instead of encoding that rule through a more complex union type.
- 2026-07-03: Removed the public `SimpleGridRootProps` alias; the component keeps the same root-only API while Ark and React can supply props typing directly.
- 2026-06-30: Inlined the private fixed/auto-fit mode types into `SimpleGridRootProps` and clarified
  stylesheet versus inline-style precedence.
- 2026-06-30: Added `SimpleGrid` with fixed columns, intrinsic auto-fit columns, independent gaps,
  Ark factory composition, and stable root styling hooks.