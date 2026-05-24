# Breadcrumbs

Base UI does not provide a dedicated breadcrumbs primitive.

Recommended composition:

- semantic `nav` + `ol`/`li` structure for breadcrumb landmarks;
- regular links for path items;
- `@base-ui/react/menu` for collapsed intermediate items (ellipsis trigger + popup list);
- compact typography and popup sizing to keep breadcrumbs visually minimal.

This component follows that composition and keeps router-link composition via `render` for
href-based items. Regular links and action items keep the same behavior when they move into the
collapsed menu.