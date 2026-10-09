# AspectRatio

## Upstream reference

Ark UI has no dedicated AspectRatio primitive. Moduix uses the
[Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory) and follows its
[composition](https://ark-ui.com/docs/guides/composition) and
[styling](https://ark-ui.com/docs/guides/styling) guides.

## Purpose

`AspectRatio` provides a responsive root whose width-to-height ratio is controlled by a required
finite positive `ratio`.

## Public contract

- `AspectRatio` is the single flat public value and the only root part.
- The root renders as an Ark factory `div`, supports `asChild`, forwards its ref, and writes
  `data-scope="aspect-ratio"`, `data-part="root"`, and `data-slot="aspect-ratio-root"`.
- Invalid ratios throw a `RangeError`.
- The ratio is written to the internal `--_aspect-ratio-value` property. An explicit
  `style.aspectRatio` or consumer CSS can override the default rule.

## Preservation notes

- Keep the root block-level, full-width, and `position: relative` for absolute-fill content.
- Do not add preset ratio aliases or managed state.
- `asChild` requires one semantic child and transfers root props to that host.

## Styling and accessibility

The component owns only the ratio layout. Consumer content owns its sizing, `object-fit`, border,
radius, and overflow. In particular, the root must not style arbitrary `img`, `video`, `iframe`,
`canvas`, or `svg` children.

## Differences from upstream

Moduix adds numeric ratio validation and stable data hooks around the Ark factory model.

## Local changelog

- 2026-09-07: Reduced the component to ratio layout and moved media sizing, clipping, radius, and
  iframe presentation to consumer-owned styles.