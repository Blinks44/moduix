# Pagination

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/pagination

## Purpose

`Pagination` provides accessible navigation through pages of a data set.

## Public contract

The flat API is `Pagination`, `PaginationRootProvider`, `PaginationContext`, `PaginationFirstTrigger`, `PaginationPrevTrigger`, `PaginationNextTrigger`, `PaginationLastTrigger`, `PaginationItem`, `PaginationEllipsis`, `PaginationItems`, `usePagination`, and `usePaginationContext`. Ark's link mode and `getPageUrl(details)` remain available.

## Preservation notes

- `count` is the number of data items; `pageSize` determines the number of pages. Preserve controlled state and details callbacks.
- `PaginationItems` is local rendering sugar; keep direct parts and provider composition available.
- Use Solid's native `<For>` and `class` behavior.

## Styling and accessibility

Ark owns keyboard movement, disabled triggers, labels, and current-page semantics. Keep `data-slot` hooks and tabular page number styling.