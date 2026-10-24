---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Toc: In the Tailwind packages `TocIndicator` keeps Ark's measurements when a parent of the list defines its own `--top` or `--height`, as `CollapsibleContent` does; before, the indicator inside a collapsible navigation took the height of the whole content. The offsets of links, the indicator, and `TocRail` use the spacing tokens instead of fixed `rem` values, so presets such as `dense` apply to them like in the CSS Modules packages.
Links clip only on the inline axis, so long labels with `TocRail` truncate with an ellipsis instead of overflowing the navigation and making it scroll horizontally.
The CSS Modules packages drop all 36 `--moduix-table-of-contents-*` variables; styles come from foundation tokens, so override a part with a class or a `data-slot` selector, and change the navigation column with `grid-template-columns` on `Toc`. Default visuals are unchanged.
Removed no-op styles: `scroll-behavior: smooth` on `TocContent` (Ark scrolls with `scrollBehavior`), the reduced-motion overrides that the duration tokens already cover, the root `box-sizing`, and explicit grid placement of the content for `placement="left"` (the content takes the free cell next to the navigation).
React and Solid export the Ark types `TocActiveChangeDetails`, `TocContentProps`, `TocContextProps`, `TocIndicatorProps`, `TocItemData`, `TocItemProps`, `TocLinkProps`, `TocListProps`, `TocNavProps`, `TocRootProps`, `TocRootProviderProps`, `TocTitleProps`, `UseTocContext`, `UseTocProps`, and `UseTocReturn`, as Vue already did. Every framework exports `TocRailProps`.
`TocRail` lines no longer break for 2px where the heading depth changes: the line before a branch now reaches the start of the next curve.