# Breadcrumbs

Upstream primitive docs: none. Base UI does not provide a dedicated breadcrumbs primitive.

## Purpose

`Breadcrumbs` renders path navigation from small semantic parts. It does not own routing, path
calculation, collapsing, or menu state. Consumers build the exact trail in JSX and compose other
components, such as `Menu`, when they need a collapsed middle segment.

## Current behavior contract

Basic usage:

```tsx
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from 'moduix';

export function Example() {
  return (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
}
```

- `Breadcrumbs` renders a `nav` landmark with default `aria-label="Breadcrumb"`.
- `BreadcrumbsList` renders an ordered list and owns the horizontal layout.
- `BreadcrumbsItem` renders a list item for each visible segment.
- `BreadcrumbsLink` renders an anchor by default and supports Base UI `useRender` for router links:
  `render={<Link href="/path" />}`.
- `BreadcrumbsPage` renders a `span` with `aria-current="page"`.
- `BreadcrumbsSeparator` renders an `aria-hidden` list item and defaults to `/` when no children are
  provided.
- `BreadcrumbsEllipsis` renders an `aria-hidden` `span` and defaults to `...` when no children are
  provided.

## Composition

The public parts are:

```text
Breadcrumbs
`- BreadcrumbsList
   |- BreadcrumbsItem
   |  `- BreadcrumbsLink
   |- BreadcrumbsSeparator
   `- BreadcrumbsItem
      `- BreadcrumbsPage
```

Collapsed paths stay explicit:

```tsx
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
  Menu,
  MenuContent,
  MenuLinkItem,
  MenuTrigger,
} from 'moduix';

export function CollapsedExample() {
  return (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <Menu>
            <MenuTrigger aria-label="Show hidden path items">
              <BreadcrumbsEllipsis />
            </MenuTrigger>
            <MenuContent align="start">
              <MenuLinkItem closeOnClick href="/engineering">
                Engineering
              </MenuLinkItem>
              <MenuLinkItem closeOnClick href="/engineering/backend">
                Backend
              </MenuLinkItem>
            </MenuContent>
          </Menu>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
}
```

## Props

All parts forward the props of their rendered element unless noted:

| Part                   | Props                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `Breadcrumbs`          | `ComponentProps<'nav'>`; defaults `aria-label` to `"Breadcrumb"` and accepts `className`.                 |
| `BreadcrumbsList`      | `ComponentProps<'ol'>` and `className`.                                                                   |
| `BreadcrumbsItem`      | `ComponentProps<'li'>` and `className`.                                                                   |
| `BreadcrumbsLink`      | `useRender.ComponentProps<'a'>`; accepts `href`, `target`, `render`, `className`, and other anchor props. |
| `BreadcrumbsPage`      | `ComponentProps<'span'>`; sets `aria-current="page"`.                                                     |
| `BreadcrumbsSeparator` | `ComponentProps<'li'>`; sets `aria-hidden="true"` and defaults children to `/`.                           |
| `BreadcrumbsEllipsis`  | `ComponentProps<'span'>`; sets `aria-hidden="true"` and defaults children to `...`.                       |

No prop types are exported because the component only forwards native/useRender props and keeps the
public type surface small.

## Defaults and styling

Every part accepts `className` on its visual root and exposes a stable `data-slot`:

| Part                   | `data-slot`             |
| ---------------------- | ----------------------- |
| `Breadcrumbs`          | `breadcrumbs-root`      |
| `BreadcrumbsList`      | `breadcrumbs-list`      |
| `BreadcrumbsItem`      | `breadcrumbs-item`      |
| `BreadcrumbsLink`      | `breadcrumbs-link`      |
| `BreadcrumbsPage`      | `breadcrumbs-page`      |
| `BreadcrumbsSeparator` | `breadcrumbs-separator` |
| `BreadcrumbsEllipsis`  | `breadcrumbs-ellipsis`  |

Public CSS variables:

| Variable                                   | Default                         |
| ------------------------------------------ | ------------------------------- |
| `--breadcrumbs-color`                      | `var(--color-muted-foreground)` |
| `--breadcrumbs-ellipsis-color`             | `var(--color-muted-foreground)` |
| `--breadcrumbs-ellipsis-radius`            | `var(--radius-sm)`              |
| `--breadcrumbs-ellipsis-size`              | `1rem`                          |
| `--breadcrumbs-focus-ring-color`           | `var(--color-ring)`             |
| `--breadcrumbs-focus-ring-width`           | `var(--border-width-sm)`        |
| `--breadcrumbs-font-size`                  | `var(--text-sm)`                |
| `--breadcrumbs-gap`                        | `var(--spacing-1)`              |
| `--breadcrumbs-item-max-width`             | `16rem`                         |
| `--breadcrumbs-line-height`                | `var(--line-height-text-sm)`    |
| `--breadcrumbs-link-color`                 | `var(--color-muted-foreground)` |
| `--breadcrumbs-link-color-hover`           | `var(--color-foreground)`       |
| `--breadcrumbs-link-radius`                | `var(--radius-sm)`              |
| `--breadcrumbs-link-text-decoration`       | `none`                          |
| `--breadcrumbs-link-text-decoration-hover` | `none`                          |
| `--breadcrumbs-link-transition`            | `var(--transition-default)`     |
| `--breadcrumbs-link-underline-offset`      | `0.2em`                         |
| `--breadcrumbs-max-width`                  | `100%`                          |
| `--breadcrumbs-page-color`                 | `var(--color-foreground)`       |
| `--breadcrumbs-page-font-weight`           | `var(--weight-medium)`          |
| `--breadcrumbs-separator-color`            | `var(--color-muted-foreground)` |
| `--breadcrumbs-separator-font-size`        | `0.875em`                       |

The last `BreadcrumbsItem` can shrink and is capped by `--breadcrumbs-item-max-width`; links, page
text, and ellipsis use `text-overflow: ellipsis`.

## Intentional differences from Base UI

- There is no upstream `Breadcrumbs` primitive and no Base UI state machine involved.
- The component is composition-first and does not generate items from data.
- Collapsing is not built in; use `Menu` or another disclosure component explicitly.
- Separators are explicit JSX parts instead of being inserted automatically.

## Accessibility and UX notes

- Keep the `nav` landmark label meaningful when there is more than one navigation landmark on a
  page.
- Use links only for navigable ancestors and `BreadcrumbsPage` for the current page.
- `BreadcrumbsSeparator` and `BreadcrumbsEllipsis` are hidden from assistive technology. When
  ellipsis opens a menu, put the accessible label on the trigger, for example
  `aria-label="Show hidden path items"`.
- Keyboard behavior comes from native anchors and any composed interactive component, such as
  `MenuTrigger`.

## Agent notes

- Preserve the semantic `nav` + `ol`/`li` structure.
- Do not add a data-driven item API unless a user explicitly asks for it; explicit composition is the
  current contract.
- Keep `BreadcrumbsLink` compatible with framework links through `render`.
- Keep stories, docs examples, and local markdown synchronized when changing slots, CSS variables,
  or defaults.

## Local changelog

- Rewrote the local contract to describe the shipped semantic wrapper, its composition model, props,
  slots, CSS variables, and accessibility notes instead of generic Base UI behavior.