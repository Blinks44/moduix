# Breadcrumbs

Base UI does not provide a dedicated breadcrumbs primitive.

Recommended composition:

- semantic `nav` + `ol`/`li` structure for breadcrumb landmarks;
- regular links for navigable path items;
- current-page text with `aria-current="page"`;
- optional composition with `@base-ui/react/menu` when a collapsed middle segment is needed.
- `render={<Link />}` on `BreadcrumbsLink` when your app standardizes on a router link component.

This component intentionally stays close to raw semantics and exposes only small styled parts:
`Breadcrumbs`, `BreadcrumbsList`, `BreadcrumbsItem`, `BreadcrumbsLink`, `BreadcrumbsPage`,
`BreadcrumbsSeparator`, and `BreadcrumbsEllipsis`.