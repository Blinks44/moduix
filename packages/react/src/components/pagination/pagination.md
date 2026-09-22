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

| Export                   | `data-slot`                | Notes                                                             |
| ------------------------ | -------------------------- | ----------------------------------------------------------------- |
| `Pagination`             | `pagination-root`          | Ark root; its label comes from `translations.rootLabel`.          |
| `PaginationRootProvider` | `pagination-root-provider` | Ark root provider; its label comes from `translations.rootLabel`. |
| `PaginationItems`        | -                          | Renders the standard computed page items and ellipses.            |
| `PaginationContext`      | Ark render prop            | Reads page state, helpers, pages, ranges, and slice helper.       |
| `usePagination`          | -                          | Creates Ark pagination state outside the rendered root.           |
| `usePaginationContext`   | -                          | Reads Ark pagination state from a descendant.                     |
| `PaginationItem`         | `pagination-item`          | Ark page item; pass `{...page}` from `pagination.pages`.          |
| `PaginationEllipsis`     | `pagination-ellipsis`      | Ark ellipsis; `index` is required.                                |
| `PaginationPrevTrigger`  | `pagination-prev-trigger`  | Ark previous trigger with default Moduix chevron.                 |
| `PaginationNextTrigger`  | `pagination-next-trigger`  | Ark next trigger with default Moduix chevron.                     |
| `PaginationFirstTrigger` | `pagination-first-trigger` | Ark first trigger with default double-chevron visual.             |
| `PaginationLastTrigger`  | `pagination-last-trigger`  | Ark last trigger with default double-chevron visual.              |

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

Page items, ellipses, and icon triggers default to `--moduix-size-md` through `--moduix-pagination-item-size`.
Page items use tabular figures and compact inline padding, so one- and two-digit labels keep the
default square footprint. Longer labels can still expand instead of clipping.

Text triggers clamp their inline padding to at least `--moduix-spacing-3`, so icon-style edge and
chevron triggers keep a comfortable hit area even when the item padding variable is tuned below
12px.

Moduix adds visual defaults only:

- default chevrons for previous/next triggers;
- default double-chevron visuals for first/last triggers;
- default `...` text for ellipsis;
- default trigger icons mirror in RTL contexts.

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
| `--moduix-pagination-item-padding-inline`        | `var(--moduix-spacing-2)`                                       |
| `--moduix-pagination-item-radius`                | `var(--moduix-radius-md)`                                       |
| `--moduix-pagination-item-size`                  | `var(--moduix-size-md)`                                         |
| `--moduix-pagination-line-height`                | `var(--moduix-line-height-text-sm)`                             |
| `--moduix-pagination-trigger-gap`                | `var(--moduix-spacing-2)`                                       |

## Intentional sugar and differences from upstream

The wrapper keeps Ark API names and exposes wrapped parts through flat family-prefixed exports.
Moduix sugar is limited to `PaginationItems`, top-level Ark hook re-exports, default icons,
default ellipsis text, `data-slot`
hooks, and styling tokens.

## Agent notes

Keep the wrapper thin. Do not add local range math, compatibility aliases, or a high-level configuration API.
Keep `PaginationContext` for custom item rendering and `PaginationItems` for the ordinary page
list. Custom renderers must pass page objects directly into `PaginationItem`.

## Local changelog

- 2026-08-31: Root and root-provider labels now preserve Ark `translations.rootLabel`.
- 2026-08-12: Stabilized the default footprint across one- and two-digit page labels while
  preserving expansion for longer numeric content, and added a numeric-content story.

- 2026-08-11: Stabilized standard page-item reconciliation across changing ranges; added
  long-range edge-navigation test coverage, a link-mode Storybook story, and synchronized
  reader-facing Pagination documentation across English, Russian, and French.

- 2026-07-29: Mirrored default trigger icons in RTL contexts and constrained the root to prevent
  narrow-container overflow. Updated pagination docs previews to use semantic result output.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced default pagination items and icon triggers to `--moduix-size-md`.

- 2026-07-10: Added `PaginationItems` for the standard page list and flat re-exports for
  `usePagination()` and `usePaginationContext()`; documented the explicit `PaginationContext` map as the
  advanced customization path.

- 2026-07-03: Removed direct package-barrel re-exports of Ark pagination hooks and duplicate public
  types while keeping `PaginationContext` for ordinary Ark-shaped page rendering.
- 2026-06-26: Audited the Ark UI migration, replaced structural icon-only trigger CSS with an
  internal class, removed stale previous-contract guidance, and aligned docs examples with the
  current Ark-shaped composition.
- 2026-06-20: Migrated Pagination from a previous custom Toolbar composition to Ark UI
  `@ark-ui/react/pagination`; replaced flat aliases with flat parts, re-exported Ark hooks and
  types, updated styling hooks, docs, stories, registry dependencies, and documented breaking API
  removals.