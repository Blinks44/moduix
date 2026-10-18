---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Pagination: The CSS Modules packages keep one of the 23 `--moduix-pagination-*` variables, `--moduix-pagination-item-size`, which sets the shared size of page items, ellipses, and triggers. Colors, borders, radius, typography, spacing, focus ring, icon size, and disabled opacity now come from foundation tokens; override them with a class on the part, and target `[data-selected]` on `PaginationItem` for the current page. Triggers with custom content use a plain 12px inline padding instead of clamping `--moduix-pagination-item-padding-inline` with `max()`. Default visuals are unchanged.
Default-icon triggers drop only their inline padding and keep the square shape through the existing minimum width, so the Tailwind packages use `px-0` instead of `w-control-md p-0`; the edge icon wrapper and the selected-item hover rule lose declarations that had no effect. An icon trigger is now detected by `children == null` only, and Solid reads the resolved children for it instead of the raw prop. Solid `Pagination` and `PaginationRootProvider` no longer split `children` out of the props only to pass them back.
React and Solid now re-export the Ark Pagination part prop, detail, and hook types (`PaginationRootProps`, `PaginationItemProps`, `PaginationPageChangeDetails`, `UsePaginationReturn`, and the rest), like Vue.