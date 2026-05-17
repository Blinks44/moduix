# Pagination

Pagination is built with the `Toolbar` primitive and provides page buttons, navigation arrows, and ellipses for collapsed ranges.

## Features

- Controlled and uncontrolled page state.
- Optional page numbers and optional navigation arrows.
- Collapsed ranges with `...` when total pages exceed the visible window.
- Link mode via `getPageHref(page)` for patterns like `/page/7` or `?page=7`.
- Size variants via `size="xs" | "sm" | "md" | "lg" | "xl"`.

## Notes

- Default toolbar style is transparent (`toolbarVariant="ghost"`).
- To show a toolbar background, use `toolbarVariant="default"` or `toolbarVariant="outline"`.