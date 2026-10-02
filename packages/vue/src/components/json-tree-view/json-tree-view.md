# JsonTreeView (Vue)

`JsonTreeView` displays JSON-like JavaScript data in an accessible, expandable tree with moduix styling.
It is the native Vue wrapper around Ark UI Vue Json Tree View.

## Upstream reference

- Ark UI: https://ark-ui.com/docs/utilities/json-tree-view

## Purpose

Use the component to inspect JSON-like values without writing a recursive tree renderer.

## Public contract

- `JsonTreeView` owns the data, generated JSON collection, and Ark tree state.
- `JsonTreeViewTree` renders the generated object, array, and value nodes.
- `JsonTreeViewRootProvider` connects the parts to a `useJsonTreeView` state instance created outside the tree; do not
  render `JsonTreeView` and `JsonTreeViewRootProvider` for the same state.
- `useJsonTreeView` and Ark's public props and return types are re-exported from `@moduix/vue/json-tree-view`.
- The public values use the flat names `JsonTreeView`, `JsonTreeViewRootProvider`, and `JsonTreeViewTree`. There is no
  `JsonTreeView.Root` namespace or compatibility alias.
- The wrappers expose stable `data-slot` values on the root, provider, and tree. Generated nodes retain Ark's
  `data-scope="json-tree-view"` and `data-part` hooks.

## Preservation notes

Ark owns data inspection, generated tree nodes, WAI-ARIA tree semantics, keyboard navigation, expansion, selection,
focus, asynchronous loading, and controlled or uncontrolled state. moduix does not transform the data or add a
parallel state model.

In `@ark-ui/vue@5.39.2`, the root forwards ordinary TreeView event listeners, such as
`expandedChange`, through attrs. Its declaration does not expose those emits, and Vue filters
`v-model` listeners because the root declares model props without corresponding emits. The
controlled selection reproduction therefore never updates its parent model.

Ark's root snapshots data, preview options, and other TreeView props during setup. The exported
`useJsonTreeView` hook likewise snapshots its reactive input before creating the computed machine
props. Replacing data or preview options does not update the tree. These are production blockers,
confirmed by direct Ark and moduix tests in both tracks. Keep the failing assertions as upstream
skips and re-enable them after fixes; do not add local state, remount keys, or callback emulation.

The built-in `indentGuide` prop also renders no guides in this Ark version: Tree always supplies
an empty named slot and suppresses Node's prop-based fallback. A consumer-provided `#indentGuide`
slot is forwarded correctly. Both behaviors have direct test coverage; do not manufacture guides
locally to repair the upstream fallback.

## Styling and accessibility

The CSS Modules wrapper styles generated branch and item rows, indentation, focus, selection, and the default branch
indicator with foundation tokens. Use the native `class` attribute on the exported parts for local changes; consumer
classes are merged after moduix classes. Target Ark's generated `data-scope` and `data-part` attributes when a value
renderer needs more specific styling.

## Vue-specific composition

`JsonTreeViewTree` exposes native Vue named slots for `#arrow`, `#indentGuide`, and the scoped `#renderValue` slot.
When `#arrow` is omitted, the wrapper supplies the moduix `ChevronRightIcon`. Template refs resolve to the Ark host
through the component instance `$el`, including `as-child` compositions.

## Differences from upstream

The wrapper gives the Ark root the flat moduix name `JsonTreeView`, adds stable `data-slot` hooks, foundation styling,
and the moduix default disclosure icon. It does not expose namespace objects, `Component.Root` aliases,
compatibility wrappers, or a second state layer.

## Local changelog

- 2026-10-02: Reviewed native slots, provider refs/listeners, and hydration stability; recorded
  upstream reactive-input and model-listener blockers with direct Ark reproductions.