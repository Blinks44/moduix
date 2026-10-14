# Bleed

## Upstream reference

Ark UI has no dedicated Bleed primitive. Moduix uses the
[Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory) and follows its
[composition](https://ark-ui.com/docs/guides/composition) and
[styling](https://ark-ui.com/docs/guides/styling) guides. The axis model comes from
[Chakra UI Bleed](https://chakra-ui.com/docs/components/bleed).

## Purpose

`Bleed` lets a child escape a constrained parent with negative margins while staying in normal
document flow. Use it for full-width media, section backgrounds, dividers, and panels that should
reach through container padding.

## Public contract

- `Bleed` is the single flat public value and the only root part.
- The root renders as an Ark factory `div`, supports `asChild`, forwards its ref, and writes
  `data-scope="bleed"`, `data-part="root"`, `data-slot="bleed-root"`, `data-inline`, and
  `data-block`. These hooks are written after consumer props, so they cannot be replaced.
- `inline`: `none | xs | sm | md | lg | xl | full`, default `full`.
- `block`: `none | xs | sm | md | lg | xl`, default `none`.
- `xs` to `xl` map to `--moduix-spacing-1`, `2`, `3`, `4`, and `6` on both axes, in CSS Modules and
  Tailwind alike.
- `inline="full"` sets `inline-size: 100vi` and `margin-inline: calc(50% - 50vi)`, so it reaches the
  viewport edges when the constrained parent is centered in the viewport.
- There are no public CSS variables. A consumer class wins over the layered defaults, so custom
  amounts are plain `margin-inline`, `margin-block`, or `inline-size` overrides.

## Preservation notes

- Keep `Bleed` a thin single-root layout primitive: no inner wrapper, state, ARIA, or positioning.
- Keep `margin: 0` on the root so `asChild` hosts such as `figure` lose their user-agent margins.
- Keep the explicit `inline-size` for `full`; without it a root that is not stretched by its
  parent (flex `align-items: center`, inline hosts) would not reach the viewport.
- `asChild` requires one semantic child that accepts DOM props and a ref.

## Styling and accessibility

`Bleed` owns only the margins. Consumers style the surface (background, padding, radius). Ancestors
with `overflow: hidden` or `overflow: clip` crop the bleed. `100vi` includes a classic vertical
scrollbar, so on systems without overlay scrollbars the page root needs `overflow-x: clip`.
Reading and focus order follow the source order.

## Differences from upstream

Chakra accepts any spacing value and per-side props (`inlineStart`, `blockEnd`, ...). Moduix keeps a
fixed token scale per axis, adds `inline="full"`, and defaults to it.

## Local changelog

- 2026-10-14: Removed the 12 `--moduix-bleed-*` variables; amounts use spacing tokens directly and
  custom amounts are class overrides.