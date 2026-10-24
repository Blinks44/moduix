# Simple Grid

## Upstream docs

- Ark UI: no SimpleGrid primitive; the component uses the Ark factory and composition model:
  https://ark-ui.com/docs/guides/composition
- Chakra UI SimpleGrid: https://chakra-ui.com/docs/components/simple-grid

## Purpose

`SimpleGrid` lays out children in equal-width columns, either with a fixed column count or with an
automatic count based on the minimum child width. It follows Chakra's `columns` and
`minChildWidth` model without Chakra's responsive style props.

## Current behavior contract

- `SimpleGrid` is the only component export; `SimpleGridRootProps` is the exported props type.
- Root accepts Ark factory div props, including `asChild`, and forwards its ref to the rendered root.
- The stylesheet (`grid grid-cols-1` in Tailwind) sets `display: grid` and one equal column, so
  consumer classes can replace both, including inside media queries.
- `columns` writes inline `grid-template-columns: repeat(columns, minmax(0, 1fr))`.
- `minChildWidth` writes inline `repeat(auto-fit, minmax(min(100%, width), 1fr))` and takes
  priority over `columns`. Numbers are pixels.
- `gap`, `rowGap`, and `columnGap` write inline styles. Numbers are pixels.
- `style` is merged last and is the final per-instance override.
- Props are not validated: an invalid value produces a CSS declaration that the browser drops, so
  the stylesheet default applies.

## Anatomy

```text
SimpleGrid
└─ root (data-scope="simple-grid" data-part="root" data-slot="simple-grid-root")
```

## Agent notes

- Keep the component root-only and stateless, with no breakpoint props or grid item APIs.
- Keep defaults in the stylesheet, not in inline styles: inline styles beat every consumer class.
- Preserve the `min(100%, width)` guard so narrow containers do not overflow (Chakra has no guard).