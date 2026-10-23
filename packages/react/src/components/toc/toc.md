# Table of Contents

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/toc
- Verified against Ark UI 5.39.0 on 2026-08-26.

## Purpose

`Toc` tracks document headings and highlights the sections currently visible in the viewport or a custom scroll container.

## Public contract

`Toc` is the root of the flat public API. It preserves Ark's `Content`, `Nav`, `Title`, `List`, `Item`, `Link`, `Indicator`, `RootProvider`, and `Context` parts under the names `TocContent`, `TocNav`, `TocTitle`, `TocList`, `TocItem`, `TocLink`, `TocIndicator`, `TocRootProvider`, and `TocContext`. Moduix adds `TocRail`, an optional SVG helper for visualising depth transitions. Every framework exports the Ark part prop types, `TocItemData`, `TocActiveChangeDetails`, `UseTocProps`, `UseTocReturn`, `UseTocContext`, and `TocRailProps`.

The root receives an `items` array with heading `value` and `depth`. Render matching heading IDs in `TocContent`, then pass the same item to `TocItem` and link to `#${item.value}` with `TocLink`.

`useToc()` creates an external store for `TocRootProvider`. Both the root and hook default `autoScroll` to `false`; opt in only after confirming that automatically revealing an active navigation item cannot scroll an ancestor container.

## Preservation notes

- Preserve controlled and uncontrolled `activeIds`, `onActiveChange(details)`, `scrollEl`, `rootMargin`, `threshold`, `autoScroll`, `scrollBehavior`, and `ids`.
- Keep callback detail objects unchanged. `details.activeIds` and `details.activeItems` come directly from Ark.
- `Content` renders an `article`; `Nav` renders a labelled `nav`; `List`, `Item`, and `Link` retain their native list and anchor semantics.
- `Link` supports `asChild`. Its single child must remain a semantic link capable of receiving Ark's ARIA, click, and focus props.
- The indicator consumes Ark's `--top` and `--height` runtime variables. It stays on the list's base axis; do not replace its measurement or active-item tracking.
- `Rail` belongs inside `Link`. Give it the current, previous, and next item depths from the same ordered collection so it can draw a curved branch between levels without affecting navigation state. The active link uses the same subtle indicator color for its branch; do not combine `Rail` with `Indicator` in the same list.

## Styling and accessibility

Every wrapper accepts `className` and exposes a `toc-*` `data-slot`. Ark supplies `data-scope="toc"`, `data-part`, `data-depth`, `data-active`, `data-first`, `data-last`, `--depth`, and `aria-current="location"`.

The root uses a content/sidebar grid that stacks below 48rem; change the navigation column with `grid-template-columns` on the root. `Nav` supports Ark's `placement="left"` and `placement="right"`; the default visual placement is right, and only the nav is placed explicitly for `left`, so the content takes the remaining cell. The nav is sticky, scrollable, and visually contained. The CSS Modules variant has no component variables; override a part with a class or a `data-slot` selector. Nested items are indented by depth; use `Rail` when the hierarchy needs a connecting line and use `Indicator` for a flat list.

The root copies Ark's `--top` and `--height` into private `--_toc-indicator-*` variables, so the indicator keeps Ark's measurements when a parent of the list, such as `CollapsibleContent`, defines its own `--top` or `--height`. Links clip only on the inline axis (`overflow-x: clip`), so long labels truncate with an ellipsis while `Rail` still reaches the neighbouring items. Transitions follow the foundation duration tokens, which reduced motion shortens; pass `scrollBehavior="auto"` when Ark-driven scrolling should avoid animation too.

## Differences from upstream

The public component and hooks use the concise Ark-shaped names `Toc`, `useToc`, and `useTocContext`. The part model, state, callbacks, and behavior remain Ark-shaped. Moduix adds default styling, responsive layout, `data-slot` hooks, and a safe `autoScroll={false}` default.