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

Use the short root form for `Pagination.Root`:

```tsx
import { Pagination } from '@moduix/react';

export function Example() {
  return (
    <Pagination count={5000} pageSize={10} siblingCount={2}>
      <Pagination.PrevTrigger />
      <Pagination.Items />
      <Pagination.NextTrigger />
    </Pagination>
  );
}
```

The public API is Ark-shaped. Use namespace parts, Ark callback details, and Ark state helpers
directly instead of local range math or layout aliases. `Pagination.usePagination()` and
`Pagination.usePaginationContext()` preserve the upstream hook contracts for normal advanced usage.

## Anatomy and exported parts

```text
Pagination.Root
├─ Pagination.FirstTrigger (optional)
├─ Pagination.PrevTrigger
├─ Pagination.Items (recommended)
├─ Pagination.Context (advanced render-prop access)
│  ├─ Pagination.Item
│  └─ Pagination.Ellipsis
├─ Pagination.NextTrigger
└─ Pagination.LastTrigger (optional)

Pagination.RootProvider
└─ same trigger, item, ellipsis, and context tree connected to usePagination()
```

| Export                            | `data-slot`                | Notes                                                       |
| --------------------------------- | -------------------------- | ----------------------------------------------------------- |
| `Pagination` / `Pagination.Root`  | `pagination-root`          | Ark root with default `aria-label="Pagination"`.            |
| `Pagination.RootProvider`         | `pagination-root-provider` | Ark root provider with default `aria-label="Pagination"`.   |
| `Pagination.Items`                | —                          | Renders the standard computed page items and ellipses.      |
| `Pagination.Context`              | Ark render prop            | Reads page state, helpers, pages, ranges, and slice helper. |
| `Pagination.usePagination`        | —                          | Creates Ark pagination state outside the rendered root.     |
| `Pagination.usePaginationContext` | —                          | Reads Ark pagination state from a descendant.               |
| `Pagination.Item`                 | `pagination-item`          | Ark page item; pass `{...page}` from `pagination.pages`.    |
| `Pagination.Ellipsis`             | `pagination-ellipsis`      | Ark ellipsis; `index` is required.                          |
| `Pagination.PrevTrigger`          | `pagination-prev-trigger`  | Ark previous trigger with default Moduix chevron.           |
| `Pagination.NextTrigger`          | `pagination-next-trigger`  | Ark next trigger with default Moduix chevron.               |
| `Pagination.FirstTrigger`         | `pagination-first-trigger` | Ark first trigger with default double-chevron visual.       |
| `Pagination.LastTrigger`          | `pagination-last-trigger`  | Ark last trigger with default double-chevron visual.        |

## Composition

Use `Pagination.Items` for normal item rendering:

```tsx
<Pagination.Items />
```

Use `Pagination.Context` when page items need custom content or layout. Use `type="link"` with
`getPageUrl(details)` for anchor navigation. Use `Pagination.usePagination()` plus
`Pagination.RootProvider` when pagination state must be created outside the rendered root. Do not
render `Pagination.Root` and `Pagination.RootProvider` for the same state instance.

## Upstream feature coverage

Supported Ark docs coverage:

- Basic page rendering through `Pagination.Items`, or `Pagination.Context` and `pagination.pages`
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
- Root provider composition with `Pagination.usePagination()` and `Pagination.RootProvider`.
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

Page items, ellipses, and icon triggers default to `--moduix-size-md` through `--moduix-pagination-item-size`.

Moduix adds visual defaults only:

- default chevrons for previous/next triggers;
- default double-chevron visuals for first/last triggers;
- default `...` text for ellipsis;
- default `aria-label="Pagination"` on root and root provider.

Public CSS variables:

| Variable                                         | Default                                                         |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `--moduix-pagination-color`                      | `var(--moduix-color-foreground)`                                |
| `--moduix-pagination-disabled-opacity`           | `var(--moduix-opacity-disabled)`                                |
| `--moduix-pagination-ellipsis-color`             | `var(--moduix-color-muted-foreground)`                          |
| `--moduix-pagination-focus-ring-color`           | `var(--moduix-color-ring)`                                      |
| `--moduix-pagination-focus-ring-offset`          | `var(--moduix-focus-ring-inset-offset)`                         |
| `--moduix-pagination-focus-ring-width`           | `var(--moduix-focus-ring-width, var(--moduix-border-width-md))` |
| `--moduix-pagination-font-size`                  | `var(--moduix-text-sm)`                                         |
| `--moduix-pagination-font-weight`                | `var(--moduix-weight-medium)`                                   |
| `--moduix-pagination-gap`                        | `var(--moduix-spacing-1)`                                       |
| `--moduix-pagination-icon-size`                  | `var(--moduix-spacing-4)`                                       |
| `--moduix-pagination-item-bg`                    | `var(--moduix-color-background)`                                |
| `--moduix-pagination-item-bg-hover`              | `var(--moduix-color-accent)`                                    |
| `--moduix-pagination-item-bg-selected`           | `var(--moduix-color-foreground)`                                |
| `--moduix-pagination-item-border-color`          | `var(--moduix-color-border)`                                    |
| `--moduix-pagination-item-border-color-selected` | `var(--moduix-color-foreground)`                                |
| `--moduix-pagination-item-border-width`          | `var(--moduix-border-width-sm)`                                 |
| `--moduix-pagination-item-color`                 | `var(--moduix-color-foreground)`                                |
| `--moduix-pagination-item-color-selected`        | `var(--moduix-color-background)`                                |
| `--moduix-pagination-item-padding-inline`        | `var(--moduix-spacing-3)`                                       |
| `--moduix-pagination-item-radius`                | `var(--moduix-radius-md)`                                       |
| `--moduix-pagination-item-size`                  | `var(--moduix-size-md)`                                         |
| `--moduix-pagination-line-height`                | `var(--moduix-line-height-text-sm)`                             |
| `--moduix-pagination-transition`                 | `var(--moduix-transition-default)`                              |
| `--moduix-pagination-trigger-gap`                | `var(--moduix-spacing-2)`                                       |

## Intentional sugar and differences from upstream

The wrapper keeps Ark API names and does not expose flat aliases. Moduix sugar is limited to
`Pagination.Items`, Ark hook namespace re-exports, default icons, default ellipsis text, root label
default, `data-slot` hooks, and styling tokens.

## Agent notes

Keep the wrapper thin. Do not add local range math, flat aliases, or a high-level configuration API.
Keep `Pagination.Context` for custom item rendering and `Pagination.Items` for the ordinary page
list. Custom renderers must pass page objects directly into `Pagination.Item`.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced default pagination items and icon triggers to `--moduix-size-md`.

- 2026-07-10: Added `Pagination.Items` for the standard page list and namespace re-exports for
  `usePagination()` and `usePaginationContext()`; documented the explicit `Context` map as the
  advanced customization path.

- 2026-07-03: Removed direct package-barrel re-exports of Ark pagination hooks and duplicate public
  types while keeping `Pagination.Context` for ordinary Ark-shaped page rendering.
- 2026-06-26: Audited the Ark UI migration, replaced structural icon-only trigger CSS with an
  internal class, removed stale previous-contract guidance, and aligned docs examples with the
  current Ark-shaped composition.
- 2026-06-20: Migrated Pagination from a previous custom Toolbar composition to Ark UI
  `@ark-ui/react/pagination`; replaced flat aliases with namespace parts, re-exported Ark hooks and
  types, updated styling hooks, docs, stories, registry dependencies, and documented breaking API
  removals.