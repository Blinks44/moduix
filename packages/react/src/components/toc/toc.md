# Table of Contents

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/toc
- Verified against Ark UI 5.39.0 on 2026-08-26.

## Purpose

`Toc` tracks document headings and highlights the sections currently visible in the viewport or a custom scroll container.

## Public contract

`Toc` is the short form of `Toc.Root`. It preserves Ark's `Content`, `Nav`, `Title`, `List`, `Item`, `Link`, `Indicator`, `RootProvider`, and `Context` parts. Moduix adds `Rail`, an optional SVG helper for visualising depth transitions.

Each root receives an `items` array with heading `value` and `depth`. Render matching heading IDs in `Toc.Content`, then pass the same item to `Toc.Item` and link to `#${item.value}` with `Toc.Link`.

`useToc()` creates an external store for `RootProvider`. Both the root and hook default `autoScroll` to `false`; opt in only after confirming that automatically revealing an active navigation item cannot scroll an ancestor container.

## Preservation notes

- Preserve controlled and uncontrolled `activeIds`, `onActiveChange(details)`, `scrollEl`, `rootMargin`, `threshold`, `autoScroll`, `scrollBehavior`, and `ids`.
- Keep callback detail objects unchanged. `details.activeIds` and `details.activeItems` come directly from Ark.
- `Content` renders an `article`; `Nav` renders a labelled `nav`; `List`, `Item`, and `Link` retain their native list and anchor semantics.
- `Link` supports `asChild`. Its single child must remain a semantic link capable of receiving Ark's ARIA, click, and focus props.
- The indicator consumes Ark's `--top` and `--height` runtime variables. It stays on the list's base axis; do not replace its measurement or active-item tracking.
- `Rail` belongs inside `Link`. Give it the current, previous, and next item depths from the same ordered collection so it can draw a curved branch between levels without affecting navigation state. The active link uses the same subtle indicator color for its branch; do not combine `Rail` with `Indicator` in the same list.

## Styling and accessibility

Every wrapper accepts `className` and exposes a `toc-*` `data-slot`. Ark supplies `data-scope="toc"`, `data-part`, `data-depth`, `data-active`, `data-first`, `data-last`, `--depth`, and `aria-current="location"`.

The root uses a content/sidebar grid that stacks below 48rem. `Nav` supports Ark's `placement="left"` and `placement="right"`; the default visual placement is right. The nav is sticky, scrollable, and visually contained. Nested items are indented by depth; use `Rail` when the hierarchy needs a connecting line and use `Indicator` for a flat list. Reduced-motion preferences disable CSS smooth scrolling and indicator transitions; pass `scrollBehavior="auto"` when Ark-driven scrolling should avoid animation too.

## Differences from upstream

The public component and hooks use the concise Ark-shaped names `Toc`, `useToc`, and `useTocContext`. The part model, state, callbacks, and behavior remain Ark-shaped. Moduix adds default styling, responsive layout, `data-slot` hooks, and a safe `autoScroll={false}` default.