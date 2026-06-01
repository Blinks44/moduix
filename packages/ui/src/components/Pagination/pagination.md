# Pagination

Pagination is a thin wrapper over the Base UI `Toolbar` primitive.

`Pagination` provides the navigation landmark. `PaginationContent` provides the toolbar behavior.
`PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, and
`PaginationEllipsis` are the styled building blocks. `usePagination` provides the headless range
logic for page windows, ellipses, and previous/next navigation.

Build the page structure explicitly in JSX and use `usePagination` when you want the library to
calculate the visible items. Keep `href` for plain anchor links, use `render={<Link />}` for router
links, and omit both when local state should use native buttons. `PaginationPrevious` and
`PaginationNext` render icon-only controls by default; pass `children` when a custom label or
layout is needed.