# Breadcrumbs

## Upstream reference

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling

Ark UI has no dedicated Breadcrumb primitive. The parts use Ark's factory model.

## Purpose

`Breadcrumbs` renders semantic path navigation and provides `BreadcrumbsPath` for a common link trail.

## Public contract

The flat API is `Breadcrumbs`, `BreadcrumbsList`, `BreadcrumbsItem`, `BreadcrumbsLink`, `BreadcrumbsPage`, `BreadcrumbsSeparator`, `BreadcrumbsEllipsis`, and `BreadcrumbsPath`. The root defaults to `aria-label="Breadcrumb"`; the shorthand accepts links and the current page.

## Preservation notes

- Keep the `nav` / ordered list / list item structure, a non-link current page, and custom hosts through `asChild`.
- Preserve Solid's `<For>` rendering and native `class` prop.

## Styling and accessibility

Separators are hidden from assistive technology. Parts expose stable `data-slot` hooks; links remain real anchors unless `asChild` supplies another host.