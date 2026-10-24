# Breadcrumbs

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition and https://ark-ui.com/docs/guides/styling (Ark has no Breadcrumb primitive)
- Chakra UI: https://chakra-ui.com/docs/components/breadcrumb
- shadcn/ui: https://ui.shadcn.com/docs/components/breadcrumb

## Purpose

`Breadcrumbs` renders semantic path navigation from small composition parts plus a narrow shorthand for common trails.

## Upstream model to preserve

Ark UI has no Breadcrumb primitive. Every part is an `@ark-ui/react/factory` `ark.*` element with `HTMLArkProps`, so
custom hosts use Ark `asChild`.

The semantic model is `nav` + `ol` + `li`, with links for navigable ancestors, a non-link current page, and visual
separators hidden from assistive technology. Collapsed paths are composed explicitly with `Menu`.

## Current behavior contract

- `Breadcrumbs` renders a `nav` with a default `aria-label` from `a11yLabels.breadcrumb` (`"Breadcrumb"`); a consumer
  `aria-label` wins.
- `BreadcrumbsList` renders an ordered list and owns the single-line flex layout.
- `BreadcrumbsItem` renders a list item for a visible segment.
- `BreadcrumbsLink` renders an anchor by default and supports Ark `asChild` for router links.
- `BreadcrumbsPage` renders a `span` with `aria-current="page"`.
- `BreadcrumbsSeparator` renders an `aria-hidden` list item and defaults to a right chevron that turns in RTL.
- `BreadcrumbsEllipsis` renders an `aria-hidden` span and defaults to a horizontal ellipsis icon. A native `button`
  that directly wraps it is reset and styled as a breadcrumb trigger: no border, padding, or background, pointer
  cursor, the link hover color, and the focus ring drawn on the ellipsis.
- `BreadcrumbsPath` renders the parts above from required `links` and `page` props, with an optional shared
  `separator`. Every `links` entry requires an `href` and renders as an anchor; `page` renders as the current page.
  It forwards its ref and native ordered-list props to the generated list and does not accept `children` or `asChild`.
- `data-slot` hooks are written after forwarded props, and the owned `aria-current` and `aria-hidden` values cannot be
  overridden.
- Exported types: `BreadcrumbsPathLink` and `BreadcrumbsPathProps`. Other parts take Ark factory props; derive them
  with `ComponentProps<typeof BreadcrumbsLink>` when needed.

## Anatomy and exported parts

```text
Breadcrumbs
`- BreadcrumbsList
   |- BreadcrumbsItem
   |  `- BreadcrumbsLink
   |- BreadcrumbsSeparator
   `- BreadcrumbsItem
      `- BreadcrumbsPage
```

| Part                   | `data-slot`             | Notes                                                       |
| ---------------------- | ----------------------- | ----------------------------------------------------------- |
| `Breadcrumbs`          | `breadcrumbs-root`      | `nav`, default landmark label.                              |
| `BreadcrumbsList`      | `breadcrumbs-list`      | `ol`, horizontal flex layout.                               |
| `BreadcrumbsItem`      | `breadcrumbs-item`      | `li`, segment wrapper.                                      |
| `BreadcrumbsLink`      | `breadcrumbs-link`      | `a`, supports `asChild`.                                    |
| `BreadcrumbsPage`      | `breadcrumbs-page`      | `span`, sets `aria-current="page"`.                         |
| `BreadcrumbsSeparator` | `breadcrumbs-separator` | `li`, hidden from assistive technology, chevron by default. |
| `BreadcrumbsEllipsis`  | `breadcrumbs-ellipsis`  | `span`, `aria-hidden`, ellipsis icon by default.            |

## Composition

```tsx
import { Breadcrumbs, BreadcrumbsPath } from '@moduix/react/breadcrumbs';

export function Example() {
  return (
    <Breadcrumbs>
      <BreadcrumbsPath
        links={[
          { href: '/', label: 'Home' },
          { href: '/vacancies', label: 'Vacancies' },
        ]}
        page="Go Developer"
      />
    </Breadcrumbs>
  );
}
```

Drop to explicit parts when items need custom markup or framework links through Ark `asChild`:

```tsx
<BreadcrumbsLink asChild>
  <Link href="/vacancies">Vacancies</Link>
</BreadcrumbsLink>
```

## Accessibility and state

Refs forward to the rendered element of each part; `BreadcrumbsPath` forwards its ref to the generated list. With
`asChild`, the child must be a single semantic link that keeps link behavior and focusability.

`BreadcrumbsEllipsis` is presentational. When it opens a menu, put it inside `MenuTrigger asChild` with a native button
and give that button the accessible label, for example `aria-label="Show hidden path items"`. The button needs no
styles of its own.

There is no component-owned state, callback, context, or keyboard navigation.

## Defaults and styling

- The root sets the muted text color. Links, separators, and the ellipsis inherit it; links turn to the foreground
  color on hover (inside `@media (hover: hover)`), and the current page uses the foreground color and medium weight.
- Items stay on one line and can shrink. Links and the page truncate with an ellipsis; the last item is capped by
  `--moduix-breadcrumbs-item-max-width` and grows to fill the remaining space up to that cap.
- Links show an inset-width focus ring as a `box-shadow` with the foundation ring tokens.

Public CSS variables (CSS Modules):

| Variable                                   | Default                                |
| ------------------------------------------ | -------------------------------------- |
| `--moduix-breadcrumbs-color`               | `var(--moduix-color-muted-foreground)` |
| `--moduix-breadcrumbs-font-size`           | `var(--moduix-text-sm)`                |
| `--moduix-breadcrumbs-gap`                 | `var(--moduix-spacing-1)`              |
| `--moduix-breadcrumbs-item-max-width`      | `16rem`                                |
| `--moduix-breadcrumbs-item-padding-x`      | `var(--moduix-spacing-1)`              |
| `--moduix-breadcrumbs-line-height`         | `var(--moduix-line-height-text-sm)`    |
| `--moduix-breadcrumbs-link-color-hover`    | `var(--moduix-color-foreground)`       |
| `--moduix-breadcrumbs-page-color`          | `var(--moduix-color-foreground)`       |
| `--moduix-breadcrumbs-page-font-weight`    | `var(--moduix-weight-medium)`          |
| `--moduix-breadcrumbs-separator-icon-size` | `1em`                                  |

## Intentional sugar and differences from upstream

- Moduix provides the part family because Ark UI has no Breadcrumb primitive.
- `BreadcrumbsPath` is narrow shorthand for anchor-based trails and generates separators; explicit composition keeps
  separators explicit.
- Collapsing is not built in; compose `Menu` explicitly for hidden path items.
- Unlike shadcn, the list does not wrap: items shrink and truncate on one line.

## Agent notes

- Do not reintroduce a `render` prop; router links use `asChild`.
- Keep `BreadcrumbsPath` narrow: anchor-based items, shared separator override, no hidden router abstraction.
- Keep collapsed examples on `MenuTrigger asChild` + `MenuPositioner` + `MenuContent` + `MenuItem asChild`.
- Keep link, separator, and ellipsis colors inherited from the root; do not add per-part color variables back.
- Keep the trigger styles keyed to a native `button` that directly wraps `BreadcrumbsEllipsis`; the ellipsis itself
  stays `aria-hidden` and never becomes the trigger.
- Keep docs, stories, registry output, and CSS variable tables synchronized when changing parts or tokens.