# Pagination

Pagination is built with the `Toolbar` primitive and provides page buttons, optional arrows, and ellipses for collapsed ranges.

Use uncontrolled mode with `defaultPage`, or controlled mode with `page` and `onPageChange`.
Use `getPageHref(page)` to render links for URL-driven pagination such as `/page/7` or `?page=7`.

The default toolbar style is transparent (`toolbarVariant="ghost"`). Use `toolbarVariant="default"` or `toolbarVariant="outline"` when the control should render on a visible surface.

## Defaults

| Prop             | Default          | Values                                       |
| ---------------- | ---------------- | -------------------------------------------- |
| `defaultPage`    | `1`              | Any positive integer                         |
| `visiblePages`   | `5`              | Any integer (minimum effective value is `3`) |
| `withPages`      | `true`           | `true`, `false`                              |
| `withArrows`     | `true`           | `true`, `false`                              |
| `disabled`       | `false`          | `true`, `false`                              |
| `size`           | `md`             | `xs`, `sm`, `md`, `lg`, `xl`                 |
| `toolbarVariant` | `ghost`          | `default`, `outline`, `ghost`                |
| `toolbarSize`    | Auto from `size` | `sm`, `md`, `lg`                             |
| `previousLabel`  | `Previous page`  | Any string                                   |
| `nextLabel`      | `Next page`      | Any string                                   |