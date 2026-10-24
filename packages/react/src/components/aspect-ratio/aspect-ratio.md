# AspectRatio

## Upstream reference

Ark UI has no dedicated AspectRatio primitive. Moduix uses the
[Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory) and follows its
[composition](https://ark-ui.com/docs/guides/composition) and
[styling](https://ark-ui.com/docs/guides/styling) guides.

## Purpose

`AspectRatio` provides a responsive root whose width-to-height ratio is controlled by `ratio`
(default `1`, like Radix).

## Public contract

- `AspectRatio` is the single flat public value and the only root part. The props type is exported
  as `AspectRatioRootProps`.
- The root renders as an Ark factory `div`, supports `asChild`, forwards its ref, and writes
  `data-scope="aspect-ratio"`, `data-part="root"`, and `data-slot="aspect-ratio-root"`.
- A missing or invalid ratio (zero, negative, `NaN`, `Infinity`) falls back to `1` instead of
  throwing, so `naturalWidth / naturalHeight` before media loads does not crash the tree.
- The ratio is written to the internal `--_aspect-ratio-value` property. An explicit
  `style.aspectRatio` or consumer CSS can override the default rule.

## Preservation notes

- Keep the root block-level, full-width, and `position: relative` for absolute-fill content.
- Keep `min-height: 0` on the root. Without it the CSS automatic minimum size lets content taller
  than the ratio stretch the frame; with it, taller content overflows and the ratio holds.
- Do not add preset ratio aliases or managed state.
- `asChild` requires one semantic child and transfers root props to that host.

## Styling and accessibility

The component owns only the ratio layout. Consumer content owns its sizing, `object-fit`, border,
radius, and overflow. In particular, the root must not style arbitrary `img`, `video`, `iframe`,
`canvas`, or `svg` children.

## Differences from upstream

Moduix renders one element with native CSS `aspect-ratio` instead of Radix's padding wrapper, and
adds stable data hooks around the Ark factory model.