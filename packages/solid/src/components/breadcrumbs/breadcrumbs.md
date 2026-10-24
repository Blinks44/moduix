# Breadcrumbs

## Upstream reference

- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling

Ark UI has no dedicated Breadcrumb primitive. The parts use Ark's factory model.

## Purpose

`Breadcrumbs` renders semantic path navigation and provides `BreadcrumbsPath` for a common link trail.

## Public contract

The flat API is `Breadcrumbs`, `BreadcrumbsList`, `BreadcrumbsItem`, `BreadcrumbsLink`, `BreadcrumbsPage`, `BreadcrumbsSeparator`, `BreadcrumbsEllipsis`, and `BreadcrumbsPath`. The root defaults to `aria-label="Breadcrumb"`; the shorthand accepts links and the current page. `BreadcrumbsPathLink` and `BreadcrumbsPathProps` are exported types.

## Preservation notes

- Keep the `nav` / ordered list / list item structure, a non-link current page, and custom hosts through `asChild`.
- Preserve Solid's `<For>` rendering and native `class` prop.

## Styling and accessibility

Separators are hidden from assistive technology. Parts expose stable `data-slot` hooks; links remain real anchors unless `asChild` supplies another host.

`BreadcrumbsEllipsis` defaults to an ellipsis icon, and a native `button` that directly wraps it is styled as the collapsed-path trigger. Links, separators, and the ellipsis inherit the root text color; links turn to the foreground color on hover. The current page uses the foreground color.