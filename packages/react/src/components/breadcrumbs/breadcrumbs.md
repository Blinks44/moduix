# Breadcrumbs

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition and https://ark-ui.com/docs/guides/styling (no dedicated Breadcrumb primitive found in current Ark docs or `@ark-ui/react`)
- Chakra UI: https://chakra-ui.com/docs/components/breadcrumb

## Purpose

`Breadcrumbs` renders semantic path navigation from small composition parts.

## Upstream model to preserve

Ark UI does not currently expose a Breadcrumb primitive in React. Preserve Ark-native composition by using the
`@ark-ui/react/factory` `ark.*` elements, `HTMLArkProps`, and `asChild` for custom hosts instead of legacy `render`
composition.

The semantic model is `nav` + `ol` + `li`, with links for navigable ancestors, a non-link current page, and visual
separators hidden from assistive technology. Collapsed paths are composed explicitly with `Menu`.

## Current behavior contract

- `Breadcrumbs` renders an Ark factory `nav` with default `aria-label="Breadcrumb"`.
- `Breadcrumbs.List` renders an ordered list and owns the horizontal layout.
- `Breadcrumbs.Item` renders a list item for a visible segment.
- `Breadcrumbs.Link` renders an anchor by default and supports Ark `asChild` for router links.
- `Breadcrumbs.Page` renders a `span` with `aria-current="page"`.
- `Breadcrumbs.Separator` renders an `aria-hidden` presentation list item and defaults to `/`.
- `Breadcrumbs.Ellipsis` renders an `aria-hidden` span and defaults to `...`.
- The root is also exposed as `Breadcrumbs.Root`, with namespace-only parts for Ark-aligned
  composition.

## Anatomy and exported parts

```text
Breadcrumbs / Breadcrumbs.Root
`- Breadcrumbs.List
   |- Breadcrumbs.Item
   |  `- Breadcrumbs.Link
   |- Breadcrumbs.Separator
   `- Breadcrumbs.Item
      `- Breadcrumbs.Page
```

| Part        | Public namespace                  | `data-slot`             | Notes                                     |
| ----------- | --------------------------------- | ----------------------- | ----------------------------------------- |
| `Root`      | `Breadcrumbs`, `Breadcrumbs.Root` | `breadcrumbs-root`      | `nav`, default landmark label.            |
| `List`      | `Breadcrumbs.List`                | `breadcrumbs-list`      | `ol`, horizontal flex layout.             |
| `Item`      | `Breadcrumbs.Item`                | `breadcrumbs-item`      | `li`, segment wrapper.                    |
| `Link`      | `Breadcrumbs.Link`                | `breadcrumbs-link`      | `a`, supports `asChild`.                  |
| `Page`      | `Breadcrumbs.Page`                | `breadcrumbs-page`      | `span`, sets `aria-current="page"`.       |
| `Separator` | `Breadcrumbs.Separator`           | `breadcrumbs-separator` | `li`, `role="presentation"`, hidden, `/`. |
| `Ellipsis`  | `Breadcrumbs.Ellipsis`            | `breadcrumbs-ellipsis`  | `span`, `aria-hidden`, defaults to `...`. |

## Composition

```tsx
import { Breadcrumbs } from '@moduix/react';

export function Example() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/vacancies">Vacancies</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
```

Use framework links through Ark `asChild`:

```tsx
<Breadcrumbs.Link asChild>
  <Link href="/vacancies">Vacancies</Link>
</Breadcrumbs.Link>
```

## Upstream feature coverage

- Dedicated Ark Breadcrumb docs and React primitive: not present in the current Ark component list, package exports, or
  `https://ark-ui.com/docs/components/breadcrumb.mdx`.
- Ark factory composition: covered by every part using `ark.*` and `HTMLArkProps`.
- Ark `asChild`: supported on all parts through `HTMLArkProps`; documented for `Breadcrumbs.Link`.
- Ark Menu composition for collapsed paths: supported through explicit `Menu`, `Menu.Positioner`,
  `Menu.Content`, and `Menu.Item asChild`.
- Controlled/uncontrolled state, callbacks, context, `RootProvider`, ids, `HiddenInput`, and Field/Fieldset state do not
  apply because breadcrumbs do not own interactive state or form state.

## Accessibility and state

Refs forward to the rendered Ark factory element for each part. `Breadcrumbs.Link` forwards to the anchor by default; with
`asChild`, the child must be a single semantic link component that preserves link behavior and focusability.

`Breadcrumbs.Page` sets `aria-current="page"`. `Breadcrumbs.Separator` is a presentational list item and
`Breadcrumbs.Ellipsis` is hidden from assistive technology. When ellipsis opens a menu, the accessible label belongs on `Menu.Trigger`, for example
`aria-label="Show hidden path items"`.

Every part exposes `data-scope="breadcrumbs"` and an Ark-style `data-part`. There is no component-owned state, callback,
keyboard navigation, or CSS runtime variable.

## Defaults and styling

Every part accepts `className` and exposes both Ark-style data attributes and stable Moduix `data-slot` hooks.

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
| `--breadcrumbs-item-padding-x`             | `0.25rem`                       |
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

The last item can shrink and is capped by `--breadcrumbs-item-max-width`; link, page, and ellipsis text uses
`text-overflow: ellipsis`.

## Intentional sugar and differences from upstream

- Moduix provides the Breadcrumb part family because Ark UI does not currently provide a dedicated primitive.
- The legacy `render` prop was removed. Use Ark `asChild`.
- Separators are explicit JSX parts instead of generated automatically.
- Collapsing is not built in; compose `Menu` explicitly for hidden path items.
- `Breadcrumbs.Ellipsis` stays non-interactive; compose it inside an accessible trigger for collapsed menus.

## Agent notes

- Do not reintroduce a `render` prop compatibility layer.
- Keep router-link composition on `asChild`.
- Keep collapsed examples on the migrated Ark Menu contract: `Portal` + `Menu.Positioner` + `Menu.Content` +
  `Menu.Item asChild`.
- Keep docs, stories, registry output, and CSS variable tables synchronized when changing parts or tokens.

## Local changelog

- 2026-06-19: Migrated the component to Ark factory elements, added Ark-style `data-scope`/`data-part` hooks,
  namespace parts, prop type exports, and replaced `render` with `asChild`.
- 2026-06-24: Re-audited the local-only Ark factory contract, made separators presentational by default,
  aligned ellipsis padding with the documented item padding token, and removed non-interactive ellipsis hover styling.