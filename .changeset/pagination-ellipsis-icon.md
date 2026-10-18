---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Pagination: `PaginationEllipsis` now shows the same horizontal ellipsis icon as `BreadcrumbsEllipsis` instead of the `...` text, sized like the trigger icons; pass children to keep custom content. The ellipsis is always `aria-hidden="true"`, as in Breadcrumbs, so screen readers no longer read "dot dot dot" between page buttons whose labels already announce every page number.