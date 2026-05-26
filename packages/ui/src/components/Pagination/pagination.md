# Pagination

Pagination is a thin wrapper over the Base UI `Toolbar` primitive.

`Pagination` provides the navigation landmark. `PaginationContent` provides the toolbar behavior.
`PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, and
`PaginationEllipsis` are the styled building blocks.

Build the page structure explicitly in JSX. That keeps the default API small and makes custom page
ranges, links, and button-driven state straightforward without extra wrapper logic. `PaginationPrevious`
and `PaginationNext` render icon-only controls by default; pass `children` when a custom label or
layout is needed.
