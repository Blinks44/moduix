# Pagination

Upstream primitive docs: https://base-ui.com/react/components/toolbar.md

## Purpose

`Pagination` is a composition-first page navigation pattern built from the Base UI `Toolbar`
primitive. moduix does not ship a single data-driven paginator component. Instead, it exposes styled
parts plus a small headless `usePagination` helper for the common "page window with ellipses"
calculation.

Use it when users need to move between result pages, article pages, or other numbered views. The
component does not own routing, fetching, URL state, or table state.

## Current behavior contract

Basic usage with local state:

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  usePagination,
} from 'moduix';
import { useState } from 'react';

export function Example() {
  const [page, setPage] = useState(5);
  const pagination = usePagination({ count: 10, page });

  return (
    <Pagination aria-label="Search results pages">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!pagination.canPreviousPage || undefined}
            onClick={() => {
              if (pagination.canPreviousPage) {
                setPage(pagination.previousPage);
              }
            }}
          />
        </PaginationItem>
        {pagination.items.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {typeof item !== 'number' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink isActive={item === pagination.page} onClick={() => setPage(item)}>
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            aria-disabled={!pagination.canNextPage || undefined}
            onClick={() => {
              if (pagination.canNextPage) {
                setPage(pagination.nextPage);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

Link-based pagination is also supported:

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/articles?page=4" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/articles?page=5" isActive>
        5
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/articles?page=6" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

- `Pagination` renders the navigation landmark and defaults `aria-label` to `"Pagination"`.
- `PaginationContent` renders a Base UI toolbar root, so keyboard roving/focus behavior comes from
  the toolbar primitive.
- `PaginationLink` renders an anchor when `href` is provided, keeps custom link composition through
  `render`, and falls back to a native `<button type="button">` when neither is provided.
- `PaginationPrevious` and `PaginationNext` are thin wrappers around `PaginationLink` with chevron
  icons and default accessible labels when they stay icon-only.
- `usePagination` is optional. You can compose the parts manually for compact or route-driven cases.

## Composition

Public parts:

```text
Pagination
`- PaginationContent
   |- PaginationItem
   |  `- PaginationPrevious
   |- PaginationItem
   |  `- PaginationLink
   |- PaginationItem
   |  `- PaginationEllipsis
   `- PaginationItem
      `- PaginationNext
```

`PaginationItem` is only a layout wrapper around a `div`. It does not add list semantics or focus
behavior. If you need list markup for surrounding layout or announcements, own that structure in
application code instead of expecting the component to render `ul`/`li`.

Compact manual composition without the hook:

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        aria-disabled={page === 1 || undefined}
        onClick={() => setPage(page - 1)}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={() => setPage(4)}>4</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive onClick={() => setPage(5)}>
        5
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={() => setPage(6)}>6</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext aria-disabled={page === 10 || undefined} onClick={() => setPage(page + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Props

All visual parts accept `className` on their rendered root. The wrappers intentionally keep the
public type surface small and forward primitive/native props instead of exporting separate prop
aliases.

### Parts

| Part                 | Rendered element / primitive | Props and behavior                                                                                               |
| -------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Pagination`         | `nav`                        | `ComponentProps<'nav'>`; defaults `aria-label` to `"Pagination"`.                                                |
| `PaginationContent`  | `Toolbar.Root`               | Base UI `Toolbar.Root.Props`; owns roving toolbar behavior.                                                      |
| `PaginationItem`     | `div`                        | `ComponentProps<'div'>`; layout wrapper only.                                                                    |
| `PaginationLink`     | `Toolbar.Link`               | Base UI `Toolbar.Link.Props` plus `isActive?: boolean`; `isActive` sets `aria-current="page"` and active styles. |
| `PaginationPrevious` | `PaginationLink`             | Same props as `PaginationLink`; defaults to a left chevron and adds `"Go to previous page"` when icon-only.      |
| `PaginationNext`     | `PaginationLink`             | Same props as `PaginationLink`; defaults to a right chevron and adds `"Go to next page"` when icon-only.         |
| `PaginationEllipsis` | `span`                       | `ComponentProps<'span'>`; renders visual `...` plus hidden `"More pages"` text.                                  |

### `usePagination`

`usePagination` is the only moduix-specific helper API:

```ts
const pagination = usePagination({
  count,
  page,
  siblingCount,
  boundaryCount,
});
```

Input behavior:

| Option          | Type     | Default | Behavior                                                                            |
| --------------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| `count`         | `number` | -       | Total number of pages. Floored to a non-negative integer.                           |
| `page`          | `number` | -       | Current page. Floored and clamped into `1..count`; becomes `0` when `count` is `0`. |
| `siblingCount`  | `number` | `1`     | Pages shown on each side of the current page. Floored to a non-negative integer.    |
| `boundaryCount` | `number` | `1`     | Always-visible pages at the start and end. Floored to a non-negative integer.       |

Returned shape:

| Field             | Type                                                  | Meaning                                  |
| ----------------- | ----------------------------------------------------- | ---------------------------------------- |
| `items`           | `Array<number \| 'ellipsis-start' \| 'ellipsis-end'>` | Visible page items in render order.      |
| `page`            | `number`                                              | Safe current page after clamping.        |
| `canPreviousPage` | `boolean`                                             | `true` when moving backward is possible. |
| `canNextPage`     | `boolean`                                             | `true` when moving forward is possible.  |
| `previousPage`    | `number`                                              | Previous safe page number.               |
| `nextPage`        | `number`                                              | Next safe page number.                   |

The hook is pure range math. It does not update state, URLs, or side effects for you.

## Defaults and styling

Stable `data-slot` hooks:

| Part                 | `data-slot`           |
| -------------------- | --------------------- |
| `Pagination`         | `pagination-root`     |
| `PaginationContent`  | `pagination-content`  |
| `PaginationItem`     | `pagination-item`     |
| `PaginationLink`     | `pagination-link`     |
| `PaginationPrevious` | `pagination-link`     |
| `PaginationNext`     | `pagination-link`     |
| `PaginationEllipsis` | `pagination-ellipsis` |

Important state/style hooks:

- Active page styling applies when `PaginationLink` receives `isActive` **or** when
  `aria-current="page"` is present.
- Disabled visual styling applies to `[aria-disabled='true']`, `[data-disabled]`, and `[disabled]`.
- Previous/next icon-only mode is automatic when no `children` are provided.

Public CSS variables:

| Variable                                | Default                         |
| --------------------------------------- | ------------------------------- |
| `--pagination-disabled-opacity`         | `var(--opacity-disabled)`       |
| `--pagination-ellipsis-color`           | `var(--color-muted-foreground)` |
| `--pagination-font-size`                | `var(--text-sm)`                |
| `--pagination-font-weight`              | `var(--weight-medium)`          |
| `--pagination-gap`                      | `var(--spacing-1)`              |
| `--pagination-icon-size`                | `1rem`                          |
| `--pagination-item-bg`                  | `var(--color-background)`       |
| `--pagination-item-bg-active`           | `var(--color-foreground)`       |
| `--pagination-item-bg-hover`            | `var(--color-accent)`           |
| `--pagination-item-border-color`        | `var(--color-border)`           |
| `--pagination-item-border-color-active` | `var(--color-foreground)`       |
| `--pagination-item-color`               | `var(--color-foreground)`       |
| `--pagination-item-color-active`        | `var(--color-background)`       |
| `--pagination-item-padding-inline`      | `0.75rem`                       |
| `--pagination-item-radius`              | `var(--radius-md)`              |
| `--pagination-item-size`                | `var(--size-lg)`                |
| `--pagination-line-height`              | `var(--line-height-text-sm)`    |

Example override:

```css
.marketingPagination {
  --pagination-item-bg-active: var(--color-primary);
  --pagination-item-border-color-active: var(--color-primary);
  --pagination-item-color-active: var(--color-primary-foreground);
  --pagination-item-radius: var(--radius-sm);
}
```

## Accessibility and UX notes

- Give each pagination landmark a distinct `aria-label` when more than one paginator appears on the
  same page, for example top and bottom table navigation.
- `PaginationContent` keeps toolbar keyboard behavior, so arrow keys move focus across interactive
  items inside the pagination control.
- `PaginationPrevious` and `PaginationNext` are accessible out of the box only in the default
  icon-only mode. If you replace the icon with custom visual content that has no visible text, keep
  an accessible name with `aria-label`.
- `aria-disabled` only changes semantics and styling. When using button-mode pagination, keep the
  click handler guarded so disabled controls do not change state.
- Prefer `href` or router `render` composition for real navigation. Prefer button mode for local
  state changes.
- `PaginationEllipsis` is non-interactive. If users need a jump menu or page picker, compose another
  control explicitly instead of making the ellipsis clickable.

## Intentional differences from Base UI

- moduix does not expose Base UI `Toolbar` as a fake dedicated pagination primitive. Pagination is a
  styled composition built on top of toolbar behavior.
- There is no high-level `items`, `pageCount`, `onPageChange`, `variant`, or `size` prop on
  `Pagination`. Build the visible structure in JSX.
- `usePagination` is the only DX sugar. It helps with page-window math but leaves rendering and
  state ownership to the consumer.
- The wrapper defaults to a native button render when `PaginationLink` has neither `href` nor
  `render`, so local-state pagination does not need extra boilerplate.

## Agent notes

- Preserve the composition-first contract. Do not replace it with a large configuration API unless a
  user explicitly asks for that change.
- Keep the `usePagination` helper synchronized with stories, docs examples, and the local markdown
  whenever its range logic or return shape changes.
- Keep the `PaginationLink` render fallback behavior: defined `href` means link mode, custom
  `render` stays supported, and missing both falls back to `<button type="button">`.
- If styling hooks or CSS variables change, update `Pagination.module.css`, `theme.css`, stories,
  docs examples, and this file in the same task.

## Local changelog

- Rewrote the local documentation to describe the shipped moduix Pagination contract instead of a
  generic Base UI summary.
- Documented the real composition model, `usePagination` helper contract, styling hooks, CSS
  variables, accessibility expectations, and limitations.
- Preserved `isActive` as the small DX sugar for page links while aligning active styling with the
  standard `aria-current="page"` state.