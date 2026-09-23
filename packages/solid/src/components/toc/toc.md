# Toc

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/toc

## Purpose

`Toc` tracks headings and highlights the section visible in the viewport or a custom scroll container.

## Public contract

The flat API includes `Toc`, `TocRootProvider`, `TocContent`, `TocNav`, `TocTitle`, `TocList`, `TocItem`, `TocLink`, `TocIndicator`, `TocRail`, `TocContext`, `useToc`, and `useTocContext`. Items provide a heading `value` and `depth`; `TocRail` is a visual SVG helper.

## Preservation notes

- Preserve controlled and uncontrolled `activeIds`, `onActiveChange(details)`, scroll container, threshold, root margin, and IDs.
- `useToc` creates state for `TocRootProvider`; `autoScroll` defaults to `false` on the root and hook.
- Keep Solid reactive item rendering and native `class` semantics.

## Styling and accessibility

Keep Ark's active-location state and `data-depth`, `data-active`, `data-first`, `data-last`, and `--depth` hooks. Preserve the responsive content/navigation layout.