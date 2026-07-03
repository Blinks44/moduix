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
translations contract. Advanced state helpers stay available directly from Ark.

Ark `count` means total data items, not total pages. `pageSize` or `defaultPageSize` controls how
many items map to one page.

## Current behavior contract

Use the short root form for `Pagination.Root`:

```tsx
import { Pagination } from '@moduix/react';

export function Example() {
  return (
    <Pagination count={5000} pageSize={10} siblingCount={2}>
      <Pagination.PrevTrigger />
      <Pagination.Context>
        {(pagination) =>
          pagination.pages.map((page, index) =>
            page.type === 'page' ? (
              <Pagination.Item key={index} {...page}>
                {page.value}
              </Pagination.Item>
            ) : (
              <Pagination.Ellipsis key={index} index={index} />
            ),
          )
        }
      </Pagination.Context>
      <Pagination.NextTrigger />
    </Pagination>
  );
}
```

The public API is Ark-shaped. Use namespace parts, Ark callback details, and Ark state helpers
directly instead of local range math or layout aliases. Advanced state helpers stay upstream; import
Ark `usePagination()` or `usePaginationContext()` directly when needed.

## Anatomy and exported parts

```text
Pagination.Root
├─ Pagination.FirstTrigger (optional)
├─ Pagination.PrevTrigger
├─ Pagination.Context (optional render-prop access)
│  ├─ Pagination.Item
│  └─ Pagination.Ellipsis
├─ Pagination.NextTrigger
└─ Pagination.LastTrigger (optional)

Pagination.RootProvider
└─ same trigger, item, ellipsis, and context tree connected to usePagination()
```

| Export                           | `data-slot`                | Notes                                                       |
| -------------------------------- | -------------------------- | ----------------------------------------------------------- |
| `Pagination` / `Pagination.Root` | `pagination-root`          | Ark root with default `aria-label="Pagination"`.            |
| `Pagination.RootProvider`        | `pagination-root-provider` | Ark root provider with default `aria-label="Pagination"`.   |
| `Pagination.Context`             | Ark render prop            | Reads page state, helpers, pages, ranges, and slice helper. |
| `Pagination.Item`                | `pagination-item`          | Ark page item; pass `{...page}` from `pagination.pages`.    |
| `Pagination.Ellipsis`            | `pagination-ellipsis`      | Ark ellipsis; `index` is required.                          |
| `Pagination.PrevTrigger`         | `pagination-prev-trigger`  | Ark previous trigger with default Moduix chevron.           |
| `Pagination.NextTrigger`         | `pagination-next-trigger`  | Ark next trigger with default Moduix chevron.               |
| `Pagination.FirstTrigger`        | `pagination-first-trigger` | Ark first trigger with default double-chevron visual.       |
| `Pagination.LastTrigger`         | `pagination-last-trigger`  | Ark last trigger with default double-chevron visual.        |

## Composition

Use `Pagination.Context` for normal item rendering:

```tsx
<Pagination.Context>
  {(pagination) =>
    pagination.pages.map((page, index) =>
      page.type === 'page' ? (
        <Pagination.Item key={index} {...page}>
          {page.value}
        </Pagination.Item>
      ) : (
        <Pagination.Ellipsis key={index} index={index} />
      ),
    )
  }
</Pagination.Context>
```

Use `type="link"` with `getPageUrl(details)` for anchor navigation. Use Ark `usePagination()` plus
`Pagination.RootProvider` when pagination state must be created outside the rendered root. Do not
render `Pagination.Root` and `Pagination.RootProvider` for the same state instance.

## Upstream feature coverage

Supported Ark docs coverage:

- Basic page rendering through `Pagination.Context` and `pagination.pages`.
- Controlled page state through `page` and `onPageChange(details)`.
- Custom translations through `translations`.
- Context helper methods such as `goToFirstPage`, `goToPrevPage`, `goToNextPage`, and
  `goToLastPage`.
- Client-side data slicing with `pagination.slice(data)`.
- Link mode with `type="link"` and `getPageUrl(details)`.
- Page range display through `pagination.pageRange`.
- Page-size control through `defaultPageSize`, `pageSize`, `onPageSizeChange(details)`, and
  `pagination.setPageSize()`.
- Root provider composition with `usePagination()` and `Pagination.RootProvider`.
- Edge navigation with `Pagination.FirstTrigger` and `Pagination.LastTrigger`.

## Accessibility and state

Ark owns keyboard behavior, selected page semantics, trigger disabled state, item labels,
translations, and page navigation state. The wrapper preserves Ark callback detail objects:

- `onPageChange(details)` exposes `details.page`.
- `onPageSizeChange(details)` exposes `details.pageSize`.
- `getPageUrl(details)` receives the Ark page URL details object.

State and attributes to preserve:

- `data-scope="pagination"` and `data-part` are emitted by Ark parts.
- `data-selected` marks the active `Pagination.Item`.
- `data-disabled` marks unavailable triggers.
- `ids` can provide stable IDs for root, item, ellipsis, and trigger parts.
- All exported parts preserve Ark `asChild`.

## Defaults and styling

Moduix adds visual defaults only:

- default chevrons for previous/next triggers;
- default double-chevron visuals for first/last triggers;
- default `...` text for ellipsis;
- default `aria-label="Pagination"` on root and root provider.

Public CSS variables:

| Variable                                  | Default                         |
| ----------------------------------------- | ------------------------------- |
| `--pagination-color`                      | `var(--color-foreground)`       |
| `--pagination-disabled-opacity`           | `var(--opacity-disabled)`       |
| `--pagination-ellipsis-color`             | `var(--color-muted-foreground)` |
| `--pagination-focus-ring-color`           | `var(--color-ring)`             |
| `--pagination-focus-ring-offset`          | `-1px`                          |
| `--pagination-focus-ring-width`           | `var(--border-width-md)`        |
| `--pagination-font-size`                  | `var(--text-sm)`                |
| `--pagination-font-weight`                | `var(--weight-medium)`          |
| `--pagination-gap`                        | `var(--spacing-1)`              |
| `--pagination-icon-size`                  | `1rem`                          |
| `--pagination-item-bg`                    | `var(--color-background)`       |
| `--pagination-item-bg-hover`              | `var(--color-accent)`           |
| `--pagination-item-bg-selected`           | `var(--color-foreground)`       |
| `--pagination-item-border-color`          | `var(--color-border)`           |
| `--pagination-item-border-color-selected` | `var(--color-foreground)`       |
| `--pagination-item-border-width`          | `var(--border-width-sm)`        |
| `--pagination-item-color`                 | `var(--color-foreground)`       |
| `--pagination-item-color-selected`        | `var(--color-background)`       |
| `--pagination-item-padding-inline`        | `0.75rem`                       |
| `--pagination-item-radius`                | `var(--radius-md)`              |
| `--pagination-item-size`                  | `var(--size-lg)`                |
| `--pagination-line-height`                | `var(--line-height-text-sm)`    |
| `--pagination-transition`                 | `var(--transition-default)`     |
| `--pagination-trigger-gap`                | `var(--spacing-2)`              |

## Intentional sugar and differences from upstream

The wrapper keeps Ark API names and does not expose flat aliases. Moduix sugar is limited to default
icons, default ellipsis text, root label default, `data-slot` hooks, and styling tokens.

## Agent notes

Keep the wrapper thin. Do not add local range math, flat aliases, or a high-level configuration
API. Keep `Pagination.Context` because ordinary page-item rendering depends on Ark `pagination.pages`.
Future examples should render page items from Ark `pagination.pages` and should pass page objects
directly into `Pagination.Item`.

## Local changelog

- 2026-07-03: Removed moduix re-exports of Ark pagination hooks and duplicate public types while
  keeping `Pagination.Context` for ordinary Ark-shaped page rendering.
- 2026-06-26: Audited the Ark UI migration, replaced structural icon-only trigger CSS with an
  internal class, removed stale previous-contract guidance, and aligned docs examples with the
  current Ark-shaped composition.
- 2026-06-20: Migrated Pagination from a previous custom Toolbar composition to Ark UI
  `@ark-ui/react/pagination`; replaced flat aliases with namespace parts, re-exported Ark hooks and
  types, updated styling hooks, docs, stories, registry dependencies, and documented breaking API
  removals.