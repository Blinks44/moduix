# JsonTreeView (Solid)

`JsonTreeView` displays JSON-like JavaScript data in an accessible, expandable tree with moduix styling.
It is the native Solid wrapper around Ark UI Solid Json Tree View.

## Upstream reference

- Ark UI: https://ark-ui.com/docs/utilities/json-tree-view
- Zag: https://zagjs.com/components/solid/json-tree-view

## Public contract

- `JsonTreeView` and `JsonTreeView.Root` accept Ark's `data`, expansion, selection, focus, and preview options.
- `JsonTreeView.Tree` renders the generated JSON nodes and supplies a chevron when `arrow` is omitted.
- `JsonTreeView.RootProvider` connects a `useJsonTreeView` state accessor to `Tree`; do not render `Root` for the same instance.
- `useJsonTreeView` and Ark's public props and return types are re-exported from `@moduix/solid/json-tree-view`.
- The wrapper exposes stable `data-slot` values on `Root`, `RootProvider`, and `Tree`; generated nodes retain Ark's
  `data-scope="json-tree-view"` and `data-part` hooks.

## Preservation notes

Ark owns data inspection, generated tree nodes, WAI-ARIA tree semantics, keyboard navigation, expansion, selection,
focus, asynchronous loading, and all controlled and uncontrolled callbacks. moduix does not transform the data or
add a parallel state model.

## Styling and accessibility

The wrapper styles generated branch and item rows, indentation, focus, selection, and the default branch indicator
with foundation tokens. Use `class` on the exported parts for local changes, or target Ark's generated
`data-scope` and `data-part` attributes when a value renderer needs more specific styling.