# Breadcrumbs

Base UI does not provide a dedicated breadcrumbs primitive.

Recommended composition:

- semantic `nav` + `ol`/`li` structure for breadcrumb landmarks;
- regular links for path items;
- `@base-ui/react/menu` for collapsed intermediate items (ellipsis trigger + popup list);
- compact typography and popup sizing to keep breadcrumbs visually minimal.

This component follows that composition and keeps full support for custom links via `render`.