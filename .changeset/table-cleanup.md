---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Table: sticky cells (`data-sticky="start" | "end"`) now keep the striped, hover, and focus row color. Before, their opaque background hid the row state, so a highlighted row broke at the sticky column. Row backgrounds now change without a fade, so the sticky column and the rest of the row switch together.
In the Tailwind packages a hovered striped row keeps its stripe when the table is not `interactive`, and `numeric` cells no longer wrap, as in the CSS Modules packages. The Vue Tailwind `TableEmpty` default text now comes from `a11yLabels.noResults`.
Remove the `variant` prop and `data-variant`: `line` had no styles, and `outline` drew a second border inside `TableScrollArea`. Add a border class to `Table` when you need an outer border without the scroll area.
Remove the `htmlWidth` prop from `TableColumn`; use the native `width` attribute.
The CSS Modules packages keep 6 `--moduix-table-*` variables instead of 41: `bg` (new, replaces `scroll-area-bg`, `sticky-header-bg`, and `sticky-column-bg`), `border-color`, `cell-padding-x`, `cell-padding-y`, `row-bg-hover` (now also used for focus within), and `row-bg-striped`. Border width, caption, typography, color, footer, empty, column border, column header, scroll area border, radius, and shadow, transition, focus, and z-index variables are removed in favor of foundation tokens; override them with a class on the part.
Remove styles with no effect: `border-spacing` with collapsed borders, `vertical-align: middle` (the table default), `color: inherit` on cells, `font-family: inherit`, the sticky intersection z-index that never left the sticky header's stacking context, and the duplicate `isolation` on `TableScrollArea`. The Tailwind body and header no longer add `group/table-body` and `group/table-header` classes.
Export the `TableRootProps` and `TableSize` types.