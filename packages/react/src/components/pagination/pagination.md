# Pagination

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/pagination
- Chakra UI: https://chakra-ui.com/docs/components/pagination

## Purpose

`Pagination` provides accessible page navigation for lists, tables, search results, and other
paginated data views.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/pagination`. Preserve the Ark parts, state shape,
callbacks, `Context`, `RootProvider`, `type="link"`, `getPageUrl(details)`, `ids`, and
translations contract.

Ark `count` means total data items, not total pages. `pageSize` or `defaultPageSize` controls how
many items map to one page.

## Current behavior contract

The React module declares a `'use client'` boundary. Server parents may pass serializable props;
event handlers and render functions belong in a client composition.

Use `Pagination` as the root:

```tsx
import {
  Pagination,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '@moduix/react/pagination';

export function Example() {
  return (
    <Pagination count={5000} pageSize={10} siblingCount={2}>
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </Pagination>
  );
}
```

The public API is Ark-shaped. Use flat parts, Ark callback details, and Ark state helpers
directly instead of local range math or layout aliases. `usePagination()` and
`usePaginationContext()` preserve the upstream hook contracts for normal advanced usage.

## Anatomy and exported parts

```text
Pagination
├─ PaginationFirstTrigger (optional)
├─ PaginationPrevTrigger
├─ PaginationItems (recommended)
├─ PaginationContext (advanced render-prop access)
│  ├─ PaginationItem
│  └─ PaginationEllipsis
├─ PaginationNextTrigger
└─ PaginationLastTrigger (optional)

PaginationRootProvider
└─ same trigger, item, ellipsis, and context tree connected to usePagination()
```

| Export                   | `data-slot`                | Notes                                                                                    |
| ------------------------ | -------------------------- | ---------------------------------------------------------------------------------------- |
| `Pagination`             | `pagination-root`          | Ark root; its label comes from `translations.rootLabel`.                                 |
| `PaginationRootProvider` | `pagination-root-provider` | Ark root provider; its label comes from `translations.rootLabel`.                        |
| `PaginationItems`        | -                          | Renders the standard computed page items and ellipses.                                   |
| `PaginationContext`      | Ark render prop            | Reads page state, helpers, pages, ranges, and slice helper.                              |
| `usePagination`          | -                          | Creates Ark pagination state outside the rendered root.                                  |
| `usePaginationContext`   | -                          | Reads Ark pagination state from a descendant.                                            |
| `PaginationItem`         | `pagination-item`          | Ark page item; pass `{...page}` from `pagination.pages`.                                 |
| `PaginationEllipsis`     | `pagination-ellipsis`      | Ark ellipsis with a default icon; `index` is required; hidden from assistive technology. |
| `PaginationPrevTrigger`  | `pagination-prev-trigger`  | Ark previous trigger with default Moduix chevron.                                        |
| `PaginationNextTrigger`  | `pagination-next-trigger`  | Ark next trigger with default Moduix chevron.                                            |
| `PaginationFirstTrigger` | `pagination-first-trigger` | Ark first trigger with default double-chevron visual.                                    |
| `PaginationLastTrigger`  | `pagination-last-trigger`  | Ark last trigger with default double-chevron visual.                                     |

## Composition

Use `PaginationItems` for normal item rendering:

```tsx
<PaginationItems />
```

Use `PaginationContext` when page items need custom content or layout. Use `type="link"` with
`getPageUrl(details)` and `asChild` anchors for anchor navigation. Use `usePagination()` plus
`PaginationRootProvider` when pagination state must be created outside the rendered root. Do not
render `Pagination` and `PaginationRootProvider` for the same state instance.

## Upstream feature coverage

Supported Ark docs coverage:

- Basic page rendering through `PaginationItems`, or `PaginationContext` and `pagination.pages`
  for custom item rendering.
- Controlled page state through `page` and `onPageChange(details)`.
- Custom translations through `translations`.
- Context helper methods such as `goToFirstPage`, `goToPrevPage`, `goToNextPage`, and
  `goToLastPage`.
- Client-side data slicing with `pagination.slice(data)`.
- Link mode with `type="link"` and `getPageUrl(details)`.
- Page range display through `pagination.pageRange`.
- Page-size control through `defaultPageSize`, `pageSize`, `onPageSizeChange(details)`, and
  `pagination.setPageSize()`.
- Root provider composition with `usePagination()` and `PaginationRootProvider`.
- Edge navigation with `PaginationFirstTrigger` and `PaginationLastTrigger`.

## Accessibility and state

Ark owns keyboard behavior, selected page semantics, trigger disabled state, item labels,
translations, and page navigation state. The wrapper preserves Ark callback detail objects:

- `onPageChange(details)` exposes `details.page`.
- `onPageSizeChange(details)` exposes `details.pageSize`.
- `getPageUrl(details)` receives the Ark page URL details object.

State and attributes to preserve:

- `data-scope="pagination"` and `data-part` are emitted by Ark parts.
- `data-selected` marks the active `PaginationItem`.
- `data-disabled` marks unavailable triggers.
- `ids` can provide stable IDs for root, item, ellipsis, and trigger parts.
- All exported parts preserve Ark `asChild`; provide one semantic child when using it.

## Defaults and styling

Page items, ellipses, and triggers share one size, `--moduix-pagination-item-size` (default
`var(--moduix-size-md)`); it is the only public CSS variable. Colors, borders, radius, typography,
focus ring, and disabled opacity come from foundation tokens; override them with a class on the part
(`[data-selected]` on `PaginationItem` for the current page). Tailwind variants use utilities and
consumer classes instead of the variable.

Page items use tabular figures and `--moduix-spacing-2` inline padding, so one- and two-digit labels
keep the square footprint and longer labels expand. Triggers with custom content use
`--moduix-spacing-3` inline padding; triggers with the default icon drop the inline padding and stay
square.

Moduix adds visual defaults only:

- default chevrons for previous/next triggers;
- default double-chevron visuals for first/last triggers;
- a default horizontal ellipsis icon, the same as `BreadcrumbsEllipsis`; the ellipsis is always
  `aria-hidden="true"` because Ark item labels already announce every page number;
- default trigger icons mirror in RTL contexts.

## Types

Every package re-exports the Ark part prop types (`PaginationRootProps`,
`PaginationRootProviderProps`, `PaginationItemProps`, and the trigger, ellipsis, and context props),
the detail types (`PaginationPageChangeDetails`, `PaginationPageSizeChangeDetails`,
`PaginationPageUrlDetails`, `PaginationItemLabelDetails`), and the hook types. The wrappers add no
props, so the Ark types describe them exactly.

## Intentional sugar and differences from upstream

The wrapper keeps Ark API names and exposes wrapped parts through flat family-prefixed exports.
Moduix sugar is limited to `PaginationItems`, top-level Ark hook re-exports, default icons,
default ellipsis icon, `data-slot`
hooks, and styling tokens.

## Agent notes

Keep the wrapper thin. Do not add local range math, compatibility aliases, or a high-level configuration API.
Keep `PaginationContext` for custom item rendering and `PaginationItems` for the ordinary page
list. Custom renderers must pass page objects directly into `PaginationItem`.